import { isUnlocked, type PlaybookChapter } from "@/content/playbook";

/** Posted 100-day reels, reported by the Vistrow publisher worker right after Instagram publishes them. */
export type LiveReels = Record<string, { reel: string; youtube: string | null; publishedAt: string }>;

const LIVE_URL = "https://vistrow-publisher.vistrow-ce34ce.workers.dev/playbook-reels";

/** null = worker unreachable (then chapters fall back to their scheduled slot). */
export async function getLiveReels(): Promise<LiveReels | null> {
  try {
    const r = await fetch(LIVE_URL, { next: { revalidate: 60 } });
    return r.ok ? ((await r.json()) as LiveReels) : null;
  } catch {
    return null;
  }
}

/** A chapter opens when its reel is actually posted (not before), so the page never shows an unreleased reel. */
export const isLive = (c: PlaybookChapter, live: LiveReels | null) => (live ? Boolean(live[c.day]) : isUnlocked(c));
export const reelUrl = (c: PlaybookChapter, live: LiveReels | null) => live?.[c.day]?.reel ?? null;
