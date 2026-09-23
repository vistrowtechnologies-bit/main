import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { collectTrendSignals } from "@/lib/blog-automation/trending";
import { generateDailyPosts, VALID_INTERNAL_LINKS, type CalendarTopic, type ExistingPost } from "@/lib/blog-automation/generate";
import { generateContentCalendar } from "@/lib/blog-automation/calendar";
import { getSanityWriteClient } from "@/lib/sanity/write-client";

const CALENDAR_SIZE = 30;

export const runtime = "nodejs";
export const maxDuration = 120;

const STUDIO_URL = "https://vistrow.sanity.studio";
const MARKDOWN_LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

export async function GET(request: Request) {
  const startedAt = new Date();
  const authHeader = request.headers.get("authorization");
  const expected = process.env.CRON_SECRET ? `Bearer ${process.env.CRON_SECRET}` : null;
  if (expected && authHeader !== expected) {
    // Persisted to Sanity (not just Vercel's own logs) because Hobby-plan log
    // retention is only 1-12 hours - a run that silently fails every day is
    // otherwise undiagnosable a day later. Sanity storage has no such limit.
    await recordCronRun({
      startedAt,
      status: "unauthorized",
      log: [`Rejected: authorization header ${authHeader ? "present but did not match CRON_SECRET" : "missing"}.`],
    });
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const requestedCount = Number(searchParams.get("count"));
  const count = Number.isInteger(requestedCount) && requestedCount > 0 && requestedCount <= 2 ? requestedCount : 2;

  const log: string[] = [];
  try {
    const writeClient = getSanityWriteClient();

    const existingPosts = await fetchExistingPosts();
    log.push(`Loaded ${existingPosts.length} existing posts for de-duplication and category rotation.`);

    let queue = await fetchPendingCalendarEntries(writeClient, count);
    log.push(`Found ${queue.length} pending topic(s) in the content calendar.`);

    if (queue.length < count) {
      log.push("Calendar queue is running low - generating a fresh 30-day batch...");
      const reservedTitles = queue.map((entry) => entry.title);
      const topics = await generateContentCalendar({ size: CALENDAR_SIZE, existingPosts, reservedTitles });
      log.push(`Generated ${topics.length} new calendar topic(s).`);
      await writeCalendarEntries(writeClient, topics);
      queue = await fetchPendingCalendarEntries(writeClient, count);
      log.push(`Queue now has ${queue.length} pending topic(s) available.`);
    }

    const assigned = queue.slice(0, count);
    const fixedTopics: CalendarTopic[] = assigned.map((entry) => ({
      title: entry.title,
      category: entry.category,
      focusKeyword: entry.focusKeyword,
      angle: entry.angle,
    }));

    log.push("Fetching trend signals...");
    const signals = await collectTrendSignals();
    log.push(`Collected ${signals.length} trend signals.`);

    log.push(`Asking OpenAI to write ${fixedTopics.length} assigned calendar topic(s)...`);
    const posts = await generateDailyPosts({ signals, existingPosts, count, fixedTopics });
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

type PendingCalendarEntry = {
  _id: string;
  title: string;
  category: CalendarTopic["category"];
  focusKeyword: string;
  angle: string;
};

// Reads the next unused topics off the 30-day content calendar, oldest
// (lowest dayIndex) first - this is the queue the daily cron consumes
// instead of re-deciding a topic every run.
async function fetchPendingCalendarEntries(
  writeClient: ReturnType<typeof getSanityWriteClient>,
  limit: number,
): Promise<PendingCalendarEntry[]> {
  return writeClient.fetch<PendingCalendarEntry[]>(
    `*[_type == "contentCalendarEntry" && status == "pending"] | order(dayIndex asc)[0...$limit]{_id, title, category, focusKeyword, angle}`,
    { limit },
  );
}

// Persists a freshly generated calendar batch as pending entries, numbered
// after whatever dayIndex already exists so multiple top-up batches over
// time keep a continuously increasing, easy-to-read order in the Studio.
async function writeCalendarEntries(
  writeClient: ReturnType<typeof getSanityWriteClient>,
  topics: CalendarTopic[],
): Promise<void> {
  const maxDayIndex = await writeClient.fetch<number | null>(
    `*[_type == "contentCalendarEntry"] | order(dayIndex desc)[0].dayIndex`,
  );
  const startIndex = (maxDayIndex ?? 0) + 1;
  const now = new Date().toISOString();

  const transaction = writeClient.transaction();
  topics.forEach((topic, offset) => {
    transaction.create({
      _id: randomUUID(),
      _type: "contentCalendarEntry",
      dayIndex: startIndex + offset,
      title: topic.title,
      category: topic.category,
      focusKeyword: topic.focusKeyword,
      angle: topic.angle,
      status: "pending",
      createdAt: now,
    });
  });
  await transaction.commit();
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

// Hard backstop for the "no em dashes, human-written" voice rule - the
// system prompt already tells the model not to use them and it has been
// compliant, but a rewrite prompt or a future signal could still slip one
// through, so strip both em and en dashes at write time regardless.
function stripDashes(text: string): string {
  return text.replace(/\s*[—–]\s*/g, ", ");
}
