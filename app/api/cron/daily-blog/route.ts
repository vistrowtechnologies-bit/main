import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { generateDailyPosts, VALID_INTERNAL_LINKS, type CalendarTopic, type ExistingPost } from "@/lib/blog-automation/generate";
import { getSanityWriteClient } from "@/lib/sanity/write-client";

// A post is only written for a calendar entry the team has added a first-hand insight to.
// No insight, no post - this is what stops generic filler from being generated.
const MIN_INSIGHT_LENGTH = 200;
// At most one long-form post every few days, however many insights are waiting.
const MIN_DAYS_BETWEEN_POSTS = 3;
// An entry that fails this many runs is skipped (so it can't block the queue) until someone edits it in Studio.
const MAX_FAILED_RUNS = 3;

export const runtime = "nodejs";
export const maxDuration = 300;

const STUDIO_URL = "https://vistrow.sanity.studio";
const MARKDOWN_LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

export async function GET(request: Request) {
  const startedAt = new Date();
  const authHeader = request.headers.get("authorization");
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    // Fail closed: without a secret anyone could trigger paid OpenAI runs and Sanity writes.
    console.error("daily-blog cron refused: CRON_SECRET is not set.");
    return NextResponse.json({ error: "Cron is not configured." }, { status: 503 });
  }
  if (authHeader !== `Bearer ${secret}`) {
    // Logged only to Vercel, not Sanity, so unauthenticated requests can't fill the dataset.
    console.warn(`daily-blog cron rejected: authorization header ${authHeader ? "did not match CRON_SECRET" : "missing"}.`);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const force = searchParams.get("force") === "1";

  const log: string[] = [];
  let currentEntryId: string | null = null;
  try {
    const writeClient = getSanityWriteClient();

    const lastUsedAt = await writeClient.fetch<string | null>(
      `*[_type == "contentCalendarEntry" && status == "used" && defined(usedAt)] | order(usedAt desc)[0].usedAt`,
    );
    const daysSinceLast = lastUsedAt ? (Date.now() - new Date(lastUsedAt).getTime()) / 86_400_000 : Infinity;
    if (!force && daysSinceLast < MIN_DAYS_BETWEEN_POSTS) {
      log.push(`Last post was generated ${daysSinceLast.toFixed(1)} day(s) ago; waiting until ${MIN_DAYS_BETWEEN_POSTS} days have passed.`);
      await recordCronRun({ startedAt, status: "ok", log, postsCreated: 0 });
      return NextResponse.json({ ok: true, created: [], log });
    }

    const queue = await fetchReadyCalendarEntries(writeClient, 1);
    if (queue.length === 0) {
      log.push(`No calendar entry has an insight of ${MIN_INSIGHT_LENGTH}+ characters yet - nothing generated.`);
      await remindAboutMissingInsights(writeClient, startedAt, log);
      await recordCronRun({ startedAt, status: "ok", log, postsCreated: 0 });
      return NextResponse.json({ ok: true, created: [], log });
    }
    currentEntryId = queue[0]._id;
    log.push(`Writing "${queue[0].title}" from its insight (${queue[0].insight.length} characters).`);

    const existingPosts = await fetchExistingPosts();
    log.push(`Loaded ${existingPosts.length} existing posts for de-duplication.`);

    const assigned = queue;
    const fixedTopics: CalendarTopic[] = assigned.map((entry) => ({
      title: entry.title,
      category: entry.category,
      focusKeyword: entry.focusKeyword,
      angle: entry.angle ?? "",
      sourceUrl: entry.sourceUrl,
      insight: entry.insight,
      secondaryKeywords: entry.secondaryKeywords,
      searchIntent: entry.searchIntent,
      linkTo: entry.linkTo,
    }));

    log.push(`Asking ${process.env.ANTHROPIC_API_KEY ? "Claude" : "OpenAI"} (${process.env.BLOG_MODEL || (process.env.ANTHROPIC_API_KEY ? "claude-sonnet-5-5" : "gpt-4o")}) to write 1 long-form post...`);
    const posts = await generateDailyPosts({ signals: [], existingPosts, fixedTopics, longForm: true });
    log.push(`Generated ${posts.length} post(s).`);

    const created: { title: string; studioUrl: string }[] = [];

    for (const [index, post] of posts.entries()) {
      const docId = `drafts.${randomUUID()}`;
      const slug = await uniqueSlug(writeClient, slugify(post.title), log);

      await writeClient.create({
        _id: docId,
        _type: "blogPost",
        title: stripDashes(post.title),
        slug: { _type: "slug", current: slug },
        excerpt: stripDashes(post.excerpt),
        category: post.category,
        author: "Vistrow Team",
        publishedAt: new Date().toISOString().slice(0, 10),
        readTime: post.readTime,
        useRealProductScreenshot: post.useRealProductScreenshot,
        screenshotGuidance: post.screenshotGuidance,
        imageBrief: post.imageBrief,
        imageGenerationPrompt: post.imageGenerationPrompt,
        imageAltSuggestion: post.imageAltSuggestion,
        sections: post.sections.map((section, index) => ({
          _key: randomUUID(),
          _type: "blogSection",
          // The opening section is always unheaded, matching the site's article convention.
          ...(index > 0 && section.heading ? { heading: stripDashes(section.heading) } : {}),
          paragraphs: section.paragraphs.map((p) => stripDashes(sanitizeLinks(p))),
          ...(section.points && section.points.length > 0 ? { points: section.points.map((p) => stripDashes(sanitizeLinks(p))) } : {}),
          ...(section.table && section.table.rows.length > 0
            ? {
                table: {
                  caption: stripDashes(section.table.caption),
                  columns: section.table.columns.map(stripDashes),
                  rows: section.table.rows.map((row) => ({ _key: randomUUID(), _type: "tableRow", cells: row.cells.map(stripDashes) })),
                },
              }
            : {}),
          ...(section.steps && section.steps.length > 0
            ? { steps: section.steps.map((step) => ({ _key: randomUUID(), _type: "diagramStep", title: stripDashes(step.title), body: stripDashes(step.body) })) }
            : {}),
        })),
        visualChecklist: post.visualPlan.map((visual) => ({
          _key: randomUUID(),
          _type: "plannedVisual",
          type: visual.type,
          afterSection: stripDashes(visual.afterSection),
          description: stripDashes(visual.description),
          done: false,
        })),
        focusKeyword: post.focusKeyword,
        secondaryKeywords: post.secondaryKeywords,
        metaTitle: stripDashes(post.metaTitle),
        metaDescription: stripDashes(post.metaDescription),
        // Mirrors metaTitle/metaDescription so the Social checklist item can
        // pass as soon as a Featured Image is added - no separate prompt
        // needed for these, and they still respect the schema's own
        // fall-back-to-SEO-title behaviour if edited to blank later.
        openGraphTitle: stripDashes(post.metaTitle),
        openGraphDescription: stripDashes(post.metaDescription),
      });

      // Leave enough of the function's time limit for bookkeeping; the image can be added in Studio instead.
      if (Date.now() - startedAt.getTime() < 180_000) {
        await attachFeaturedImage(writeClient, docId, post.imageGenerationPrompt, post.imageAltSuggestion, slug, log);
      } else {
        log.push("Skipped featured image generation: not enough time left in this run.");
      }

      created.push({
        title: post.title,
        studioUrl: `${STUDIO_URL}/structure/blogPost;${encodeURIComponent(docId)}`,
      });

      const entry = assigned[index];
      if (entry) await markCalendarEntryUsed(writeClient, entry._id, docId, log);
    }

    log.push(`Created ${created.length} draft document(s) in Sanity - nothing is published.`);

    await recordCronRun({ startedAt, status: "ok", log, postsCreated: created.length });
    return NextResponse.json({ ok: true, created, log });
  } catch (error) {
    log.push(`Error: ${String(error)}`);
    console.error("Daily blog cron failed", error);
    if (currentEntryId) await recordEntryFailure(currentEntryId, String(error), log);
    await recordCronRun({ startedAt, status: "error", log, error: String(error) });
    return NextResponse.json({ ok: false, error: String(error), log }, { status: 500 });
  }
}

// Writes a permanent record of this run to Sanity - unlike Vercel's own
// request logs (1-12 hour retention on Hobby), this survives indefinitely,
// so a run that silently fails every day for a week is actually diagnosable
// afterward instead of a dead end. Never throws - a logging failure must
// never mask or replace the real response to the caller.
async function recordCronRun(input: {
  startedAt: Date;
  status: "ok" | "error" | "unauthorized";
  log: string[];
  error?: string;
  postsCreated?: number;
}) {
  try {
    const writeClient = getSanityWriteClient();
    await writeClient.create({
      _id: `cronRun-${input.startedAt.getTime()}-${randomUUID().slice(0, 8)}`,
      _type: "cronRun",
      route: "/api/cron/daily-blog",
      startedAt: input.startedAt.toISOString(),
      durationMs: Date.now() - input.startedAt.getTime(),
      status: input.status,
      postsCreated: input.postsCreated ?? 0,
      error: input.error,
      log: input.log,
    });
  } catch (loggingError) {
    console.error("Failed to record cron run", loggingError);
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
      `*[_type == "blogPost"] | order(publishedAt desc)[0...600]{_id, title, category}`,
    );
    const seen = new Map<string, ExistingPost>();
    for (const doc of docs) {
      if (!doc.title) continue;
      const baseId = doc._id.startsWith("drafts.") ? doc._id.slice("drafts.".length) : doc._id;
      if (!seen.has(baseId) || doc._id.startsWith("drafts.")) {
        seen.set(baseId, { title: doc.title, category: doc.category });
      }
    }
    // No cap here (beyond the 600-doc fetch above): a lower cap previously
    // pushed older titles out of the de-duplication window as post volume
    // grew, which is exactly what let evergreen topics like "lead management
    // software" get regenerated many times - the whole point of this list is
    // catching that, so trimming it defeats the purpose.
    return [...seen.values()];
  } catch {
    return [];
  }
}

type ReadyCalendarEntry = {
  _id: string;
  title: string;
  category: CalendarTopic["category"];
  focusKeyword: string;
  angle?: string;
  sourceUrl?: string;
  insight: string;
  secondaryKeywords?: string[];
  searchIntent?: string;
  linkTo?: string;
};

// Next calendar entries that have a real insight attached, in planned order.
async function fetchReadyCalendarEntries(
  writeClient: ReturnType<typeof getSanityWriteClient>,
  limit: number,
): Promise<ReadyCalendarEntry[]> {
  return writeClient.fetch<ReadyCalendarEntry[]>(
    `*[_type == "contentCalendarEntry" && !(_id in path("drafts.**")) && !(status in ["used", "archived"]) && length(insight) >= $minInsight && coalesce(failedRuns, 0) < $maxFailures]
      | order(dayIndex asc)[0...$limit]{_id, title, category, focusKeyword, angle, sourceUrl, insight, secondaryKeywords, searchIntent, linkTo}`,
    { limit, minInsight: MIN_INSIGHT_LENGTH, maxFailures: MAX_FAILED_RUNS },
  );
}

// Generates the featured image from the post's own prompt and attaches it to the draft.
// Never throws - a missing image only means the editor adds one in Studio before publishing.
async function attachFeaturedImage(
  writeClient: ReturnType<typeof getSanityWriteClient>,
  docId: string,
  prompt: string,
  alt: string,
  slug: string,
  log: string[],
): Promise<void> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    log.push("Skipped featured image: OPENAI_API_KEY is not configured.");
    return;
  }
  try {
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: process.env.BLOG_IMAGE_MODEL || "gpt-image-2", prompt, size: "1536x1024", quality: "high", n: 1 }),
      signal: AbortSignal.timeout(90_000),
    });
    if (!response.ok) {
      log.push(`Featured image generation failed: ${response.status} ${await response.text()}`);
      return;
    }
    const data = await response.json();
    const b64 = data?.data?.[0]?.b64_json;
    if (typeof b64 !== "string") {
      log.push("Featured image generation returned no image.");
      return;
    }
    const asset = await writeClient.assets.upload("image", Buffer.from(b64, "base64"), { filename: `${slug}.png` });
    // The blog shows featured images in a 16:9 frame with object-cover, so the 3:2 image is centre-cropped on display.
    await writeClient
      .patch(docId)
      .set({ featuredImage: { _type: "image", asset: { _type: "reference", _ref: asset._id }, alt } })
      .commit();
    log.push("Featured image generated and attached.");
  } catch (error) {
    log.push(`Featured image generation failed: ${String(error)}`);
  }
}

// Counts a failed attempt on the entry and stores the reason where the team can see it in Studio.
// Never throws.
async function recordEntryFailure(entryId: string, error: string, log: string[]): Promise<void> {
  try {
    await getSanityWriteClient()
      .patch(entryId)
      .setIfMissing({ failedRuns: 0 })
      .inc({ failedRuns: 1 })
      .set({ lastError: error.slice(0, 2000) })
      .commit();
  } catch (patchError) {
    log.push(`Warning: failed to record the failure on calendar entry ${entryId}: ${String(patchError)}`);
  }
}

// Once a week (Mondays), email the team the topics waiting for an insight, so the
// pipeline doesn't silently stall. Never throws.
async function remindAboutMissingInsights(
  writeClient: ReturnType<typeof getSanityWriteClient>,
  startedAt: Date,
  log: string[],
): Promise<void> {
  if (startedAt.getUTCDay() !== 1) return;
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || "hello@vistrow.com";
  if (!apiKey || !from) {
    log.push("Skipped insight reminder email: RESEND_API_KEY or CONTACT_FROM_EMAIL is not configured.");
    return;
  }

  try {
    const waiting = await writeClient.fetch<{ title: string; focusKeyword: string; insightNeeded?: string }[]>(
      `*[_type == "contentCalendarEntry" && !(_id in path("drafts.**")) && status == "needs-insight"] | order(dayIndex asc)[0...5]{title, focusKeyword, insightNeeded}`,
    );
    if (waiting.length === 0) return;

    const subject = `Blog: ${waiting.length} planned post(s) are waiting for your insight`;
    const text = `No blog post was written this week because no planned topic has an insight yet. Add one in Studio to the next topic:\n\n${waiting
      .map((t, i) => `${i + 1}. ${t.title} (keyword: ${t.focusKeyword})${t.insightNeeded ? `\n   Needed: ${t.insightNeeded}` : ""}`)
      .join("\n")}\n\n${STUDIO_URL}/structure/contentCalendarEntry`;
    const html = `<p>No blog post was written this week because no planned topic has an insight yet. Add one in Studio to the next topic:</p><ol>${waiting
      .map((t) => `<li><strong>${escapeHtml(t.title)}</strong> (keyword: ${escapeHtml(t.focusKeyword)})${t.insightNeeded ? `<br>Needed: ${escapeHtml(t.insightNeeded)}` : ""}</li>`)
      .join("")}</ol><p><a href="${STUDIO_URL}/structure/contentCalendarEntry">Open the content calendar</a></p>`;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], subject, text, html }),
    });
    if (!response.ok) log.push(`Insight reminder email failed: ${response.status} ${await response.text()}`);
    else log.push(`Insight reminder email sent to ${to}.`);
  } catch (error) {
    log.push(`Insight reminder email failed: ${String(error)}`);
  }
}

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// Marks a calendar entry consumed the moment its draft is created, never
// throwing - a logging/bookkeeping failure here must not undo or block the
// actual blog post draft that was already written to Sanity.
async function markCalendarEntryUsed(
  writeClient: ReturnType<typeof getSanityWriteClient>,
  entryId: string,
  blogPostId: string,
  log: string[],
): Promise<void> {
  try {
    await writeClient
      .patch(entryId)
      .set({ status: "used", usedAt: new Date().toISOString(), blogPostId })
      .commit();
  } catch (error) {
    log.push(`Warning: failed to mark calendar entry ${entryId} as used: ${String(error)}`);
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

// Hard, code-level guarantee against the duplicate-slug collisions Sanity's
// own Studio validation was catching (two posts with byte-identical titles
// producing the same slug, one left permanently unpublishable). The model-
// level duplicate-topic retry is best-effort and can still converge back to
// an identical title after 3 attempts - this is the backstop that makes a
// collision structurally impossible regardless of what the model returns.
async function uniqueSlug(writeClient: ReturnType<typeof getSanityWriteClient>, base: string, log: string[]): Promise<string> {
  const existing = await writeClient.fetch<string[]>(`*[_type == "blogPost" && slug.current match $base + "*"].slug.current`, { base });
  if (!existing.includes(base)) return base;
  let n = 2;
  while (existing.includes(`${base}-${n}`)) n++;
  log.push(`Slug "${base}" was already in use - disambiguated to "${base}-${n}".`);
  return `${base}-${n}`;
}

// Defense-in-depth: drop any link the model produced that isn't a real internal
// path, official AI source article, or a bare external homepage.
function sanitizeLinks(text: string): string {
  return text.replace(MARKDOWN_LINK, (full, label: string, href: string) => {
    if (href.startsWith("/")) {
      return VALID_INTERNAL_LINKS.has(href) ? full : label;
    }
    try {
      const url = new URL(href);
      const isBareHomepage = url.pathname === "/" || url.pathname === "";
      const isOfficialAiSource = url.protocol === "https:" && ["openai.com", "www.openai.com", "blog.google"].includes(url.hostname);
      // Vistrow's own product sites are allowed with full paths (e.g. arthaleads.com/whatsapp-crm).
      const isOwnProduct = url.protocol === "https:" && ["www.arthaleads.com", "arthaleads.com", "www.vistrowvoice.com", "vistrowvoice.com"].includes(url.hostname);
      return isBareHomepage || isOfficialAiSource || isOwnProduct ? full : label;
    } catch {
      return label;
    }
  });
}

// Hard backstop for the "no em dashes, human-written" voice rule - the
// system prompt already tells the model not to use them and it has been
// compliant, but a rewrite prompt or a future signal could still slip one
// through, so strip both em and en dashes at write time regardless.
function stripDashes(text: string): string {
  return text.replace(/\s*[—–]\s*/g, ", ");
}
