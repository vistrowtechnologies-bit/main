import { getAccessToken } from "@/lib/seo-report/search-console";

// Google Analytics 4 Data API, read with the Search Console service account (a Viewer on the property).
// The property ID is not a secret; GA4_PROPERTY_ID overrides it.
const PROPERTY_ID = process.env.GA4_PROPERTY_ID || "544497583";
const SCOPE = "https://www.googleapis.com/auth/analytics.readonly";

type ReportRow = { dimensionValues?: { value: string }[]; metricValues?: { value: string }[] };

async function runReport(body: object): Promise<ReportRow[]> {
  const token = await getAccessToken(SCOPE);
  const response = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY_ID}:runReport`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(30_000),
  });
  if (!response.ok) throw new Error(`GA4 report failed: ${response.status} ${await response.text()}`);
  const data = (await response.json()) as { rows?: ReportRow[] };
  return data.rows ?? [];
}

const num = (row: ReportRow, index: number) => Number(row.metricValues?.[index]?.value ?? 0);
const dim = (row: ReportRow, index: number) => row.dimensionValues?.[index]?.value ?? "";

export type PageTraffic = { page: string; views: number; users: number };
export type ChannelTraffic = { channel: string; sessions: number; users: number };
export type AiTraffic = { assistant: string; source: string; landingPage: string; sessions: number; users: number };

// Referrers of AI assistants, matched on the session source so each one is counted separately
// (GA4's own "AI Assistant" channel lumps them together and misses some, e.g. Gemini or Copilot).
const AI_SOURCES: [RegExp, string][] = [
  [/chatgpt|openai/i, "ChatGPT"],
  [/perplexity/i, "Perplexity"],
  [/gemini|bard/i, "Gemini"],
  [/claude|anthropic/i, "Claude"],
  [/copilot|bing\.com\/chat/i, "Copilot"],
  [/deepseek/i, "DeepSeek"],
  [/grok|x\.ai/i, "Grok"],
  [/meta\.ai/i, "Meta AI"],
  [/you\.com|phind|poe\.com|mistral|kimi|qwen/i, "Other AI"],
];
const assistantFor = (source: string) => AI_SOURCES.find(([pattern]) => pattern.test(source))?.[1];

// Site totals, sessions by channel and views per page for a date range (YYYY-MM-DD or "28daysAgo").
export async function getTraffic(startDate: string, endDate: string) {
  const dateRanges = [{ startDate, endDate }];
  const [totalRows, channelRows, pageRows, sourceRows] = await Promise.all([
    runReport({ dateRanges, metrics: [{ name: "activeUsers" }, { name: "sessions" }, { name: "screenPageViews" }, { name: "engagementRate" }] }),
    runReport({
      dateRanges,
      dimensions: [{ name: "sessionDefaultChannelGroup" }],
      metrics: [{ name: "sessions" }, { name: "activeUsers" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
    }),
    runReport({
      dateRanges,
      dimensions: [{ name: "pagePath" }],
      metrics: [{ name: "screenPageViews" }, { name: "activeUsers" }],
      orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
      limit: 500,
    }),
    runReport({
      dateRanges,
      dimensions: [{ name: "sessionSource" }, { name: "landingPage" }],
      metrics: [{ name: "sessions" }, { name: "activeUsers" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: 1000,
    }),
  ]);
  const ai = sourceRows
    .map((row) => ({ source: dim(row, 0), landingPage: dim(row, 1), sessions: num(row, 0), users: num(row, 1) }))
    .flatMap((row) => {
      const assistant = assistantFor(row.source);
      return assistant ? [{ assistant, ...row } as AiTraffic] : [];
    });
  const byAssistant = Object.values(
    ai.reduce<Record<string, { assistant: string; sessions: number; users: number }>>((acc, row) => {
      const entry = (acc[row.assistant] ??= { assistant: row.assistant, sessions: 0, users: 0 });
      entry.sessions += row.sessions;
      entry.users += row.users;
      return acc;
    }, {}),
  ).sort((a, b) => b.sessions - a.sessions);
  const total = totalRows[0];
  return {
    totals: {
      users: total ? num(total, 0) : 0,
      sessions: total ? num(total, 1) : 0,
      views: total ? num(total, 2) : 0,
      engagementRate: total ? Math.round(num(total, 3) * 1000) / 10 : 0,
    },
    channels: channelRows.map((row): ChannelTraffic => ({ channel: dim(row, 0), sessions: num(row, 0), users: num(row, 1) })),
    pages: pageRows.map((row): PageTraffic => ({ page: dim(row, 0), views: num(row, 0), users: num(row, 1) })),
    ai: { byAssistant, landings: ai.slice(0, 30) },
  };
}
