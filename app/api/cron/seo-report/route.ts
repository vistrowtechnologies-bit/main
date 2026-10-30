import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { querySearchAnalytics, type SearchRow } from "@/lib/seo-report/search-console";
import { KEYWORD_VOLUMES, volumeFor } from "@/lib/seo-report/keyword-volumes";
import { getSanityWriteClient } from "@/lib/sanity/write-client";
import { notifySearchEngines } from "@/lib/indexing/notify";
import { getTraffic } from "@/lib/seo-report/analytics";

export const runtime = "nodejs";
export const maxDuration = 120;

const STUDIO_URL = "https://vistrow.sanity.studio";
const SITE_URL = process.env.GSC_SITE_URL || "https://www.vistrow.com/";

// Runs daily. Every run tells search engines about changed pages (see lib/indexing/notify.ts) and saves
// the last 28 days of GA4 views per page to Sanity (gaPageStats, read by the blog sheet sync).
// On the 1st of the month (or with ?report=1) it also builds the SEO report: the last 4 weeks of
// Search Console data, matched with Keyword Planner volumes, saved to Sanity and emailed.
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return NextResponse.json({ error: "Cron is not configured." }, { status: 503 });
  if (request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const log: string[] = [];
  try {
    await notifySearchEngines(log);
  } catch (error) {
    log.push(`Indexing notification failed: ${String(error)}`);
  }

  try {
    const traffic = await getTraffic("28daysAgo", "yesterday");
    await getSanityWriteClient().createOrReplace({
      _id: "gaPageStats",
      _type: "gaPageStats",
      updatedAt: new Date().toISOString(),
      totals: traffic.totals,
      pages: traffic.pages.map((row) => ({ _key: randomUUID(), ...row })),
    });
    log.push(`GA4: saved views for ${traffic.pages.length} pages.`);
  } catch (error) {
    log.push(`GA4 page stats failed: ${String(error)}`);
  }

  const wantsReport = new URL(request.url).searchParams.get("report") === "1" || new Date().getUTCDate() === 1;
  if (!wantsReport) return NextResponse.json({ ok: true, indexing: log });
  if (!process.env.GSC_SERVICE_ACCOUNT_JSON) return NextResponse.json({ ok: true, indexing: log, report: "skipped: GSC_SERVICE_ACCOUNT_JSON is not configured" });

  try {
    // Search Console data lags 2-3 days, so the window ends 3 days ago.
    const end = daysAgo(3);
    const start = daysAgo(30);
    const [queryPageRows, pageRows] = await Promise.all([
      querySearchAnalytics({ siteUrl: SITE_URL, startDate: start, endDate: end, dimensions: ["query", "page"], rowLimit: 2000 }),
      querySearchAnalytics({ siteUrl: SITE_URL, startDate: start, endDate: end, dimensions: ["page"], rowLimit: 500 }),
    ]);

    const report = buildReport(queryPageRows, pageRows);
    // Visitors from every source, not only Google Search. Optional: the report still runs if GA4 is unavailable.
    const traffic = await getTraffic(start, end).catch((error) => {
      log.push(`GA4 traffic failed: ${String(error)}`);
      return null;
    });
    const writeClient = getSanityWriteClient();
    const docId = `seoReport-${end}`;
    await writeClient.createOrReplace({
      _id: docId,
      _type: "seoReport",
      periodStart: start,
      periodEnd: end,
      createdAt: new Date().toISOString(),
      ...report,
      topQueries: report.topQueries.map((row) => ({ _key: randomUUID(), _type: "seoQueryRow", ...row })),
      strikingDistance: report.strikingDistance.map((row) => ({ _key: randomUUID(), _type: "seoQueryRow", ...row })),
      pagesToImprove: report.pagesToImprove.map((row) => ({ _key: randomUUID(), _type: "seoPageRow", ...row })),
      plannedKeywordsNotRanking: report.plannedKeywordsNotRanking,
      ...(traffic && {
        traffic: {
          totals: traffic.totals,
          channels: traffic.channels.map((row) => ({ _key: randomUUID(), ...row })),
          topPages: traffic.pages.slice(0, 25).map((row) => ({ _key: randomUUID(), ...row })),
        },
      }),
    });
    const emailStatus = await emailReport(report, traffic, start, end, docId);
    return NextResponse.json({ ok: true, indexing: log, docId, emailStatus, totals: report.totals, traffic: traffic?.totals ?? null });
  } catch (error) {
    console.error("SEO report failed", error);
    return NextResponse.json({ ok: false, indexing: log, error: String(error) }, { status: 500 });
  }
}

type QueryRow = { query: string; page: string; clicks: number; impressions: number; position: number; volume?: string };
type PageRow = { page: string; clicks: number; impressions: number; position: number; reason: string };

function buildReport(queryPageRows: SearchRow[], pageRows: SearchRow[]) {
  const rows: QueryRow[] = queryPageRows.map((row) => ({
    query: row.keys[0],
    page: row.keys[1].replace(/^https:\/\/www\.vistrow\.com/, "") || "/",
    clicks: row.clicks,
    impressions: row.impressions,
    position: round(row.position),
    volume: volumeFor(row.keys[0]),
  }));

  const totals = {
    clicks: pageRows.reduce((sum, row) => sum + row.clicks, 0),
    impressions: pageRows.reduce((sum, row) => sum + row.impressions, 0),
    averagePosition: round(
      pageRows.reduce((sum, row) => sum + row.position * row.impressions, 0) / Math.max(1, pageRows.reduce((sum, row) => sum + row.impressions, 0)),
    ),
    pages: pageRows.length,
  };

  const topQueries = [...rows].sort((a, b) => b.impressions - a.impressions).slice(0, 25);

  // Positions 5-30 with real impressions: the quickest wins, a content or title tweak can move them to page 1.
  const strikingDistance = rows
    .filter((row) => row.position >= 5 && row.position <= 30 && row.impressions >= 3)
    .sort((a, b) => volumeRank(b.volume) - volumeRank(a.volume) || b.impressions - a.impressions)
    .slice(0, 20);

  const pagesToImprove: PageRow[] = pageRows
    .map((row) => ({
      page: row.keys[0].replace(/^https:\/\/www\.vistrow\.com/, "") || "/",
      clicks: row.clicks,
      impressions: row.impressions,
      position: round(row.position),
    }))
    .filter((row) => row.impressions >= 20 && (row.position > 20 || row.clicks === 0))
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 15)
    .map((row) => ({
      ...row,
      reason:
        row.position > 40
          ? "Shown deep in results: strengthen the content and internal links for its main search."
          : row.position > 20
            ? "Page 3-4: close to page 1. Add depth, FAQs and links from related pages."
            : "Ranks but gets no clicks: rewrite the title and description to match the search.",
    }));

  // Researched keywords Google isn't showing the site for at all yet.
  const seen = new Set(rows.map((row) => row.query.toLowerCase()));
  const plannedKeywordsNotRanking = Object.keys(KEYWORD_VOLUMES).filter((keyword) => !seen.has(keyword));

  return { totals, topQueries, strikingDistance, pagesToImprove, plannedKeywordsNotRanking };
}

async function emailReport(
  report: ReturnType<typeof buildReport>,
  traffic: Awaited<ReturnType<typeof getTraffic>> | null,
  start: string,
  end: string,
  docId: string,
) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || "hello@vistrow.com";
  if (!apiKey || !from) return "skipped: Resend not configured";

  const row = (cells: (string | number)[]) => `<tr>${cells.map((cell) => `<td style="padding:4px 8px;border-bottom:1px solid #eee">${escapeHtml(String(cell))}</td>`).join("")}</tr>`;
  const table = (head: string[], body: string) =>
    `<table style="border-collapse:collapse;font:13px sans-serif"><tr>${head.map((h) => `<th align="left" style="padding:4px 8px">${h}</th>`).join("")}</tr>${body}</table>`;
  const html = `<h2>Vistrow SEO report: ${start} to ${end}</h2>
<p>${report.totals.clicks} clicks · ${report.totals.impressions} impressions · average position ${report.totals.averagePosition} · ${report.totals.pages} pages shown</p>
${
    traffic
      ? `<h3>All visitors (Google Analytics)</h3><p>${traffic.totals.users} users · ${traffic.totals.sessions} sessions · ${traffic.totals.views} page views · ${traffic.totals.engagementRate}% engaged</p>
${table(["Channel", "Sessions", "Users"], traffic.channels.map((r) => row([r.channel, r.sessions, r.users])).join(""))}
<h3>Most viewed pages</h3>${table(["Page", "Views", "Users"], traffic.pages.slice(0, 15).map((r) => row([r.page, r.views, r.users])).join(""))}`
      : ""
  }
<h3>Quick wins (positions 5-30)</h3>${table(["Search", "Monthly volume", "Position", "Impressions", "Page"], report.strikingDistance.map((r) => row([r.query, r.volume ?? "-", r.position, r.impressions, r.page])).join(""))}
<h3>Pages to improve</h3>${table(["Page", "Impressions", "Position", "Clicks", "Why"], report.pagesToImprove.map((r) => row([r.page, r.impressions, r.position, r.clicks, r.reason])).join(""))}
<h3>Researched keywords not showing yet</h3><p>${report.plannedKeywordsNotRanking.map(escapeHtml).join(", ") || "None"}</p>
<p><a href="${STUDIO_URL}/structure/seoReport;${docId}">Open the full report in Studio</a></p>`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], subject: `Vistrow SEO report: ${report.totals.clicks} clicks, position ${report.totals.averagePosition}`, html }),
  });
  return response.ok ? `sent to ${to}` : `failed: ${response.status}`;
}

const VOLUME_ORDER = ["10K-100K", "1K-10K", "100-1K", "10-100"];
function volumeRank(volume: string | undefined) {
  const index = volume ? VOLUME_ORDER.findIndex((v) => volume.startsWith(v)) : -1;
  return index === -1 ? 0 : VOLUME_ORDER.length - index;
}

function daysAgo(days: number) {
  return new Date(Date.now() - days * 86_400_000).toISOString().slice(0, 10);
}

function round(value: number) {
  return Math.round(value * 10) / 10;
}

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
