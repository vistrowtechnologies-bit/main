export type TrendSignal = {
  source: "google-news" | "reddit" | "hacker-news";
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
];

const REDDIT_SUBS = ["marketing", "PPC", "CRM", "SaaS", "realestateinvesting", "artificial"];

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
    const url = `https://www.reddit.com/r/${sub}/top.json?limit=8&t=day`;
    const response = await fetch(url, {
      headers: { "User-Agent": "vistrow-blog-trends/1.0" },
      next: { revalidate: 0 },
    });
    if (!response.ok) return [];
    const data = await response.json();
    const children = data?.data?.children;
    if (!Array.isArray(children)) return [];
    return children
      .map((child: { data?: { title?: string; permalink?: string } }): TrendSignal | null => {
        const title = child?.data?.title;
        if (!title) return null;
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
  const [newsResults, redditResults, hnResults] = await Promise.all([
    Promise.all(NEWS_QUERIES.map(fetchGoogleNews)),
    Promise.all(REDDIT_SUBS.map(fetchReddit)),
    fetchHackerNews(),
  ]);

  const all = [...newsResults.flat(), ...redditResults.flat(), ...hnResults];
  const seen = new Set<string>();
  return all.filter((signal) => {
    const key = signal.title.toLowerCase().trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
