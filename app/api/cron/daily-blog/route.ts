import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { collectTrendSignals } from "@/lib/blog-automation/trending";
import { generateDailyPosts } from "@/lib/blog-automation/generate";
import { getSanityWriteClient } from "@/lib/sanity/write-client";
import { sanityClient } from "@/lib/sanity/client";

export const runtime = "nodejs";
export const maxDuration = 120;

const STUDIO_URL = "https://vistrow.sanity.studio";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const expected = process.env.CRON_SECRET ? `Bearer ${process.env.CRON_SECRET}` : null;
  if (expected && authHeader !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const log: string[] = [];
  try {
    log.push("Fetching trend signals...");
    const signals = await collectTrendSignals();
    log.push(`Collected ${signals.length} trend signals.`);

    const existingTitles = await fetchExistingTitles();
    log.push(`Loaded ${existingTitles.length} existing post titles for de-duplication.`);

    log.push("Asking OpenAI to draft 2 posts...");
    const posts = await generateDailyPosts({ signals, existingTitles });
    log.push(`Generated ${posts.length} posts.`);

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
        sections: post.sections.map((section, index) => ({
          _key: randomUUID(),
          _type: "blogSection",
          // The opening section is always unheaded, matching the site's article convention.
          ...(index > 0 && section.heading ? { heading: section.heading } : {}),
          paragraphs: section.paragraphs,
          ...(section.points && section.points.length > 0 ? { points: section.points } : {}),
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

    log.push(`Created ${created.length} draft documents in Sanity.`);

    await notifyTeam(created).catch((error) => {
      log.push(`Notification email failed: ${String(error)}`);
    });

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

async function notifyTeam(created: { title: string; studioUrl: string }[]) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || "hello@vistrow.com";
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from || created.length === 0) return;

  const itemsHtml = created
    .map(
      (item) => `
        <tr>
          <td style="padding:0 0 14px;">
            <p style="margin:0 0 6px;font-family:Helvetica,Arial,sans-serif;font-size:15px;font-weight:700;color:#0D0D0D;">${escapeHtml(item.title)}</p>
            <a href="${item.studioUrl}" style="font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#4E6700;">Review and publish in Sanity Studio &rarr;</a>
          </td>
        </tr>`,
    )
    .join("");

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:32px 16px;background:#F7F8FA;font-family:Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="width:560px;max-width:100%;background:#FFFFFF;border:1px solid #E5E7EB;border-radius:16px;overflow:hidden;">
            <tr><td style="height:4px;background:#C6FF00;line-height:4px;font-size:0;">&nbsp;</td></tr>
            <tr>
              <td style="padding:32px 40px 0;">
                <img src="https://www.vistrow.com/logo-light.png" width="118" height="32" alt="Vistrow" style="display:block;height:32px;width:auto;border:0;" />
              </td>
            </tr>
            <tr>
              <td style="padding:28px 40px 0;">
                <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#4E6700;">Daily blog drafts</p>
                <h1 style="margin:10px 0 0;font-family:Helvetica,Arial,sans-serif;font-size:22px;font-weight:800;color:#0D0D0D;">${created.length} new draft${created.length === 1 ? "" : "s"} ready for review</h1>
                <p style="margin:14px 0 0;font-family:Helvetica,Arial,sans-serif;font-size:15px;color:#1C1C1E;line-height:1.7;">Generated from today's trending topics. Nothing is published yet - review each draft in Sanity Studio and hit publish when it's ready.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 40px 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${itemsHtml}</table>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 40px;background:#0D0D0D;">
                <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:12px;color:#A7ADB8;">Vistrow Technologies &middot; Automated daily blog pipeline</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = `${created.length} new blog draft(s) ready for review:\n\n${created.map((item) => `${item.title}\n${item.studioUrl}`).join("\n\n")}`;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `${created.length} new blog draft${created.length === 1 ? "" : "s"} ready for review`,
      text,
      html,
    }),
  });
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>'"]/g,
    (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] || character,
  );
}
