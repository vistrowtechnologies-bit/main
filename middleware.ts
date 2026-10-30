import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";
import { matchAiCrawler } from "@/lib/analytics/ai-crawlers";
import { sanityDataset, sanityProjectId } from "@/lib/sanity/config";

// Counts visits from AI crawlers (GPTBot, ClaudeBot, PerplexityBot...), which Google Analytics never sees
// because bots do not run JavaScript. Each hit is appended to a per-day Sanity document after the response
// is sent, so visitors and bots get the page with no delay. The monthly SEO report sums the last 28 days.
export function middleware(request: NextRequest, event: NextFetchEvent) {
  const crawler = matchAiCrawler(request.headers.get("user-agent"));
  const token = process.env.SANITY_API_TOKEN;
  if (crawler && token && process.env.VERCEL_ENV === "production") {
    const day = new Date().toISOString().slice(0, 10);
    const id = `aiCrawlers-${day}`;
    const hit = { _key: crypto.randomUUID().replace(/-/g, "").slice(0, 12), bot: crawler.bot, owner: crawler.owner, kind: crawler.kind, path: request.nextUrl.pathname, at: new Date().toISOString() };
    event.waitUntil(
      fetch(`https://${sanityProjectId}.api.sanity.io/v2024-01-01/data/mutate/${sanityDataset}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          mutations: [
            { createIfNotExists: { _id: id, _type: "aiCrawlerDay", day, hits: [] } },
            { patch: { id, insert: { after: "hits[-1]", items: [hit] } } },
          ],
        }),
      }).catch(() => undefined),
    );
  }
  return NextResponse.next();
}

export const config = {
  // Pages plus robots.txt, sitemaps and llms.txt; skips build assets, images and API routes.
  matcher: ["/((?!_next/|api/|images/|work/|favicon|.*\\.(?:png|jpg|jpeg|webp|avif|svg|gif|ico|mp4|woff2?|css|js|map)$).*)"],
};
