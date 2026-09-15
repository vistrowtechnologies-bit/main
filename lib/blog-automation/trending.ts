export type TrendSignal = {
  source: "google-news" | "reddit" | "hacker-news" | "product-seo" | "service-seo" | "google-autocomplete";
  title: string;
  url?: string;
};

const NEWS_QUERIES = [
  "digital marketing trends",
  "AI voice agents customer service",
  "CRM software",
  "marketing automation",
  "real estate technology",
  "B2B SaaS growth",
  "SEO strategy",
  "performance marketing",
  "social media marketing trends",
  "landing page conversion rate",
  "Google Ads Meta Ads",
  "website conversion optimisation",
];

const REDDIT_SUBS = [
  "marketing",
  "PPC",
  "CRM",
  "SaaS",
  "realestateinvesting",
  "artificial",
  "SEO",
  "socialmedia",
  "digital_marketing",
  "smallbusiness",
  "Entrepreneur",
  "advertising",
];

// Real-search-intent seed phrases fed through Google's own autocomplete -
// these are actual queries people type, refreshed every run, unlike a
// hand-written list that a 2-post/day cadence burns through in under two
// weeks. Rotated by day so not all ~24 are hit on every run.
const AUTOCOMPLETE_SEEDS = [
  "digital marketing agency",
  "performance advertising",
  "SEO for",
  "social media marketing for",
  "landing page",
  "website development for",
  "marketing automation for",
  "conversion tracking",
  "creative strategy for",
  "AI voice agent",
  "AI voice calling",
  "real estate CRM",
  "lead generation for",
  "Google Ads vs",
  "CRM software for",
  "WhatsApp marketing",
  "local SEO",
  "content marketing for",
  "marketing automation tools",
  "AI marketing",
  "B2B lead generation",
  "PPC campaign",
  "email marketing automation",
  "growth marketing",
];

async function fetchGoogleNews(query: string): Promise<TrendSignal[]> {
  try {
    const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}+when:2d&hl=en-IN&gl=IN&ceid=IN:en`;
    const response = await fetch(url, { next: { revalidate: 0 } });
    if (!response.ok) return [];
    const xml = await response.text();
    const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0, 6);
    return items
      .map((match): TrendSignal | null => {
        const block = match[1];
        const title = block.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.trim();
        const link = block.match(/<link>([\s\S]*?)<\/link>/)?.[1]?.trim();
        if (!title) return null;
        return { source: "google-news", title: decodeXml(title), url: link };
      })
      .filter((item): item is TrendSignal => item !== null);
  } catch {
    return [];
  }
}

async function fetchReddit(sub: string): Promise<TrendSignal[]> {
  try {
    // A week-wide window with a minimum score cuts out same-day noise
    // (memes, one-line vent posts) that never map to anything searched on
    // Google - top-of-week posts with real upvotes are a much better proxy
    // for a discussion topic worth writing about.
    const url = `https://www.reddit.com/r/${sub}/top.json?limit=10&t=week`;
    const response = await fetch(url, {
      headers: { "User-Agent": "vistrow-blog-trends/1.0" },
      next: { revalidate: 0 },
    });
    if (!response.ok) return [];
    const data = await response.json();
    const children = data?.data?.children;
    if (!Array.isArray(children)) return [];
    return children
      .map((child: { data?: { title?: string; permalink?: string; score?: number } }): TrendSignal | null => {
        const title = child?.data?.title;
        const score = child?.data?.score ?? 0;
        if (!title || score < 25) return null;
        return {
          source: "reddit",
          title,
          url: child.data?.permalink ? `https://reddit.com${child.data.permalink}` : undefined,
        };
      })
      .filter((item): item is TrendSignal => item !== null);
  } catch {
    return [];
  }
}

// Pull real, currently-typed search queries from Google's own autocomplete -
// this is the actual "will people search this" signal, as opposed to a
// hand-written list or Reddit chatter. No API key needed; rotates through a
// few seed phrases each run (by day-of-year) so the full list gets covered
// over roughly a week without hammering the endpoint every time.
async function fetchAutocomplete(seed: string): Promise<TrendSignal[]> {
  try {
    const url = `https://suggestqueries.google.com/complete/search?client=firefox&hl=en&gl=in&q=${encodeURIComponent(seed)}`;
    const response = await fetch(url, { next: { revalidate: 0 } });
    if (!response.ok) return [];
    const data = await response.json();
    const suggestions = data?.[1];
    if (!Array.isArray(suggestions)) return [];
    return suggestions
      .filter((s): s is string => typeof s === "string" && s.trim().length > 0)
      .map((s) => ({ source: "google-autocomplete" as const, title: s }));
  } catch {
    return [];
  }
}

function todaysAutocompleteSeeds(): string[] {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const perDay = 6;
  const start = (dayOfYear * perDay) % AUTOCOMPLETE_SEEDS.length;
  const seeds: string[] = [];
  for (let i = 0; i < perDay; i++) seeds.push(AUTOCOMPLETE_SEEDS[(start + i) % AUTOCOMPLETE_SEEDS.length]);
  return seeds;
}

async function fetchHackerNews(): Promise<TrendSignal[]> {
  try {
    const response = await fetch("https://hn.algolia.com/api/v1/search?tags=front_page&query=AI%20OR%20SaaS%20OR%20marketing", {
      next: { revalidate: 0 },
    });
    if (!response.ok) return [];
    const data = await response.json();
    const hits = data?.hits;
    if (!Array.isArray(hits)) return [];
    return hits
      .slice(0, 8)
      .map((hit: { title?: string; url?: string }): TrendSignal | null =>
        hit.title ? { source: "hacker-news", title: hit.title, url: hit.url } : null,
      )
      .filter((item): item is TrendSignal => item !== null);
  } catch {
    return [];
  }
}

function decodeXml(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1");
}

export async function collectTrendSignals(): Promise<TrendSignal[]> {
  const [newsResults, redditResults, hnResults, autocompleteResults] = await Promise.all([
    Promise.all(NEWS_QUERIES.map(fetchGoogleNews)),
    Promise.all(REDDIT_SUBS.map(fetchReddit)),
    fetchHackerNews(),
    Promise.all(todaysAutocompleteSeeds().map(fetchAutocomplete)),
  ]);

  const all = [...newsResults.flat(), ...redditResults.flat(), ...hnResults, ...autocompleteResults.flat()];
  const seen = new Set<string>();
  return all.filter((signal) => {
    const key = signal.title.toLowerCase().trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
