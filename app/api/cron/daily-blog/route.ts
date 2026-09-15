import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { collectTrendSignals } from "@/lib/blog-automation/trending";
import { generateDailyPosts, VALID_INTERNAL_LINKS, type ExistingPost, type GeneratedPost } from "@/lib/blog-automation/generate";
import { generateBlogImage } from "@/lib/blog-automation/image";
import { findScreenshotTarget, captureRealScreenshot } from "@/lib/blog-automation/screenshot";
import { getSanityWriteClient } from "@/lib/sanity/write-client";
import type { SanityClient } from "@sanity/client";

export const runtime = "nodejs";
// Real-screenshot capture (headless Chromium) adds real latency on top of
// text + illustration generation, so this needs more headroom than before.
export const maxDuration = 240;

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

    const existingPosts = await fetchExistingPosts();
    log.push(`Loaded ${existingPosts.length} existing posts for de-duplication and category rotation.`);

    log.push(`Asking OpenAI to draft ${count} post(s)...`);
    const posts = await generateDailyPosts({ signals, existingPosts, count });
    log.push(`Generated ${posts.length} post(s).`);

    const writeClient = getSanityWriteClient();
    const created: { title: string; studioUrl: string }[] = [];

    for (const post of posts) {
      const docId = `drafts.${randomUUID()}`;
      const slug = slugify(post.title);
      const featuredImage = await resolveFeaturedImage(post, writeClient, log);

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
        useRealProductScreenshot: post.useRealProductScreenshot,
        screenshotGuidance: post.screenshotGuidance,
        imageBrief: post.imageBrief,
        imageGenerationPrompt: post.imageGenerationPrompt,
        imageAltSuggestion: post.imageAltSuggestion,
        ...(featuredImage ? { featuredImage } : {}),
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
        // Mirrors metaTitle/metaDescription so the Social checklist item can
        // pass as soon as a Featured Image is added - no separate prompt
        // needed for these, and they still respect the schema's own
        // fall-back-to-SEO-title behaviour if edited to blank later.
        openGraphTitle: post.metaTitle,
        openGraphDescription: post.metaDescription,
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

// Uses the write client (raw perspective, sees drafts) instead of the
// public published-only client - a topic that's only ever existed as an
// unpublished draft was previously invisible here, so the model would
// happily regenerate a near-duplicate of it every run since nothing had
// technically been "published" yet. Both a draft and its published sibling
// share one logical document (ids "drafts.<id>" / "<id>"), so this collapses
// them to one entry, preferring the draft since it's the latest edit.
async function fetchExistingPosts(): Promise<ExistingPost[]> {
  try {
    const writeClient = getSanityWriteClient();
    const docs = await writeClient.fetch<{ _id: string; title: string; category?: string }[]>(
      `*[_type == "blogPost"] | order(publishedAt desc)[0...150]{_id, title, category}`,
    );
    const seen = new Map<string, ExistingPost>();
    for (const doc of docs) {
      if (!doc.title) continue;
      const baseId = doc._id.startsWith("drafts.") ? doc._id.slice("drafts.".length) : doc._id;
      if (!seen.has(baseId) || doc._id.startsWith("drafts.")) {
        seen.set(baseId, { title: doc.title, category: doc.category });
      }
    }
    return [...seen.values()].slice(0, 80);
  } catch {
    return [];
  }
}

// Attempts to get a real featured image for the post - either a real
// screenshot of a known public product page, or an OpenAI-generated
// illustration - and uploads it to Sanity. Returns undefined (never throws)
// on any failure, so a post is never lost just because its image couldn't
// be produced; someone can add it manually later, same as before this existed.
async function resolveFeaturedImage(
  post: GeneratedPost,
  writeClient: SanityClient,
  log: string[],
): Promise<Record<string, unknown> | undefined> {
  try {
    if (post.useRealProductScreenshot) {
      const target = findScreenshotTarget(post.screenshotGuidance, post.focusKeyword);
      if (!target) {
        log.push(`"${post.title}": needs a real product screenshot but no known public page matched - add one manually.`);
        return undefined;
      }
      const captured = await captureRealScreenshot(target);
      if (!captured) {
        log.push(`"${post.title}": real screenshot capture failed - add one manually.`);
        return undefined;
      }
      const asset = await writeClient.assets.upload("image", captured.buffer, {
        filename: `${Date.now()}.png`,
        contentType: captured.contentType,
      });
      log.push(`"${post.title}": attached a real screenshot of ${target.url}.`);
      return {
        _type: "image",
        asset: { _type: "reference", _ref: asset._id },
        alt: post.imageAltSuggestion || target.altFallback,
      };
    }

    const generated = await generateBlogImage(post.imageGenerationPrompt);
    if (!generated) {
      log.push(`"${post.title}": AI image generation failed - add a featured image manually.`);
      return undefined;
    }
    const asset = await writeClient.assets.upload("image", generated.buffer, {
      filename: `${Date.now()}.png`,
      contentType: generated.contentType,
    });
    log.push(`"${post.title}": generated and attached an AI illustration.`);
    return {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
      alt: post.imageAltSuggestion,
    };
  } catch (error) {
    log.push(`"${post.title}": image step errored (${String(error)}) - add a featured image manually.`);
    return undefined;
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
