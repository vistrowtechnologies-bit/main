import { chapters } from "@/content/playbook";
import { playbookSeo } from "@/content/playbook-seo";
import { getLiveReels, isLive } from "@/lib/playbook-live";
import { siteUrl } from "@/lib/seo";

export const revalidate = 60;

/** Escape text for XML element content / attribute values (also strips control chars invalid in XML 1.0). */
function xmlEscape(s: string): string {
  return s
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F￾￿]/g, "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** RFC-822 date (Date#toUTCString gives "Mon, 19 Oct 2026 13:00:00 GMT"). */
const rfc822 = (ms: number) => new Date(ms).toUTCString();

export async function GET() {
  const live = await getLiveReels();
  const items = chapters
    .filter((c) => isLive(c, live))
    .map((c) => {
      const published = live?.[c.day]?.publishedAt;
      const ms = published && !Number.isNaN(Date.parse(published)) ? Date.parse(published) : Date.parse(`${c.release}:00+05:30`);
      return { c, ms };
    })
    .sort((a, b) => b.ms - a.ms);

  const hub = `${siteUrl}/playbook`;
  const lastBuild = items.length ? Math.max(...items.map((i) => i.ms)) : Date.now();

  const itemXml = items
    .map(({ c, ms }) => {
      const url = `${siteUrl}/playbook/${c.slug}`;
      const desc = playbookSeo[c.slug]?.answer ?? c.description;
      return [
        "    <item>",
        `      <title>${xmlEscape(c.h1 ?? c.title)}</title>`,
        `      <link>${xmlEscape(url)}</link>`,
        `      <guid isPermaLink="true">${xmlEscape(url)}</guid>`,
        `      <pubDate>${rfc822(ms)}</pubDate>`,
        `      <description>${xmlEscape(desc)}</description>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Vistrow 100 Din Playbook</title>
    <link>${hub}</link>
    <atom:link href="${hub}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Ek naya free checklist ya template har din: small business ko online grow karne ke liye 100 din ka playbook.</description>
    <language>hi-IN</language>
    <lastBuildDate>${rfc822(lastBuild)}</lastBuildDate>
${itemXml}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
