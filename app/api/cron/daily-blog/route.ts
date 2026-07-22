import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { collectTrendSignals } from "@/lib/blog-automation/trending";
import { generateDailyPosts, VALID_INTERNAL_LINKS } from "@/lib/blog-automation/generate";
import { getSanityWriteClient } from "@/lib/sanity/write-client";
import { sanityClient } from "@/lib/sanity/client";

export const runtime = "nodejs";
export const maxDuration = 120;

const STUDIO_URL = "https://vistrow.sanity.studio";
const MARKDOWN_LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const expected = process.env.CRON_SECRET ? `Bearer ${process.env.CRON_SECRET}` : null;
  if (expected && authHeader !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const requestedCount = Number(searchParams.get("count"));
  const count = Number.isInteger(requestedCount) && requestedCount > 0 && requestedCount <= 2 ? requestedCount : 2;

  const log: string[] = [];
  try {
    log.push("Fetching trend signals...");
    const signals = await collectTrendSignals();
    log.push(`Collected ${signals.length} trend signals.`);

    const existingTitles = await fetchExistingTitles();
    log.push(`Loaded ${existingTitles.length} existing post titles for de-duplication.`);

    log.push(`Asking OpenAI to draft ${count} post(s)...`);
    const posts = await generateDailyPosts({ signals, existingTitles, count });
    log.push(`Generated ${posts.length} post(s).`);

    const writeClient = getSanityWriteClient();
    const created: { title: string; studioUrl: string }[] = [];

    for (const post of posts) {
      const docId = `drafts.${randomUUID()}`;
      const slug = slugify(post.title);

      await writeClient.create({
        _id: docId,
        _type: "blogPost",
        title: post.title,
        slug: { _type: "slug", current: slug },
        excerpt: post.excerpt,
        category: post.category,
        author: "Vistrow Team",
        publishedAt: new Date().toISOString().slice(0, 10),
        readTime: post.readTime,
        imageBrief: post.imageBrief,
        imageAltSuggestion: post.imageAltSuggestion,
        sections: post.sections.map((section, index) => ({
          _key: randomUUID(),
          _type: "blogSection",
          // The opening section is always unheaded, matching the site's article convention.
          ...(index > 0 && section.heading ? { heading: section.heading } : {}),
          paragraphs: section.paragraphs.map(sanitizeLinks),
          ...(section.points && section.points.length > 0 ? { points: section.points.map(sanitizeLinks) } : {}),
        })),
        focusKeyword: post.focusKeyword,
        secondaryKeywords: post.secondaryKeywords,
        metaTitle: post.metaTitle,
        metaDescription: post.metaDescription,
      });

      created.push({
        title: post.title,
        studioUrl: `${STUDIO_URL}/structure/blogPost;${encodeURIComponent(docId)}`,
      });
    }

    log.push(`Created ${created.length} draft document(s) in Sanity - nothing is published.`);

    return NextResponse.json({ ok: true, created, log });
  } catch (error) {
    log.push(`Error: ${String(error)}`);
    console.error("Daily blog cron failed", error);
    return NextResponse.json({ ok: false, error: String(error), log }, { status: 500 });
  }
}

async function fetchExistingTitles(): Promise<string[]> {
  try {
    return await sanityClient.fetch<string[]>(
      `*[_type == "blogPost"] | order(publishedAt desc)[0...80].title`,
    );
  } catch {
    return [];
  }
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 96);
}

// Defense-in-depth: drop any link the model produced that isn't a real internal
// path or a bare external homepage, even though the prompt already constrains this.
function sanitizeLinks(text: string): string {
  return text.replace(MARKDOWN_LINK, (full, label: string, href: string) => {
    if (href.startsWith("/")) {
      return VALID_INTERNAL_LINKS.has(href) ? full : label;
    }
    try {
      const url = new URL(href);
      const isBareHomepage = url.pathname === "/" || url.pathname === "";
      return isBareHomepage ? full : label;
    } catch {
      return label;
    }
  });
}
