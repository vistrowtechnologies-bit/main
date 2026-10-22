// Scores every live blog post for SEO, AEO (answer engines) and GEO (generative engines).
// Usage: node scripts/blog-score.mjs [--json out.json]
import { createClient } from "@sanity/client";
import fs from "node:fs";

const env = Object.fromEntries(
  fs.readFileSync(".env.local", "utf8").split("\n").filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => { const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^"|"$/g, "")]; }),
);
const client = createClient({ projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: env.NEXT_PUBLIC_SANITY_DATASET, apiVersion: "2024-01-01", useCdn: false, perspective: "published" });
const merges = JSON.parse(fs.readFileSync("config/blog-merges.json", "utf8"));
const posts = (await client.fetch(`*[_type=="blogPost" && defined(slug.current) && !defined(redirectUrl)] | order(publishedAt desc){
  _id, title, "slug": slug.current, publishedAt, focusKeyword, metaTitle, metaDescription, excerpt, faqs, keyTakeaways,
  "img": featuredImage.asset._ref, "alt": featuredImage.alt, sections}`)).filter((p) => !(p.slug in merges));

const AUTHORITY = /(meta\.com|facebook\.com\/business|developers\.facebook|google\.com|support\.google|trai\.gov|gov\.in|nic\.in|maharera|rbi\.org|sebi\.gov|mca\.gov|developers\.google|whatsapp\.com|business\.whatsapp)/i;
const has = (text, phrase) => !!phrase && text.toLowerCase().includes(phrase.toLowerCase());
const SLOP = ["in today's", "game-changer", "game changer", "unlock", "leverage", "seamless", "delve", "embark", "landscape", "realm",
  "navigate the", "harness", "elevate", "empower", "robust", "streamline", "pivotal", "crucial", "furthermore", "moreover", "it's worth noting",
  "let's dive", "here's the thing", "tapestry", "testament to", "cutting-edge", "revolutionize", "revolutionise", "transformative", "in conclusion",
  "ever-evolving", "look no further"];
const ANECDOTE = /\b(we've seen|we have seen|we see |we keep seeing|teams we (talk|speak) to|our clients|in our experience|i've |i would)/i;
const QWORD = /^(what|how|why|when|which|who|is|are|can|should|does|do|will)\b/i;

function score(p) {
  const kw = p.focusKeyword || "";
  const secs = p.sections || [];
  const paras = secs.flatMap((s) => s.paragraphs || []);
  const points = secs.flatMap((s) => s.points || []);
  const body = [...paras, ...points].join(" ");
  const words = body.split(/\s+/).filter(Boolean).length;
  const first100 = paras.join(" ").split(/\s+/).slice(0, 100).join(" ");
  const headings = secs.map((s) => s.heading).filter(Boolean);
  const links = [...body.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)].map((m) => m[1]);
  const internal = links.filter((l) => l.startsWith("/")).length;
  const external = links.filter((l) => /^https?:\/\//.test(l) && !/vistrow\.com/.test(l));
  const authority = external.filter((l) => AUTHORITY.test(l)).length;
  const tables = secs.filter((s) => s.table?.rows?.length).length;
  const lists = secs.filter((s) => (s.points || []).length || (s.steps || []).length).length;
  const numbers = (body.match(/(₹|Rs\.?\s?)\s?\d|\d+(\.\d+)?\s?%|\b\d{2,}[,\d]*\b/g) || []).length;
  const firstPara = (paras[0] || "").split(/\s+/).length;
  const density = words && kw ? ((body.toLowerCase().split(kw.toLowerCase()).length - 1) * kw.split(/\s+/).length * 100) / words : 0;
  const faqs = (p.faqs || []).length;
  const qHeadings = headings.filter((h) => QWORD.test(h) || h.trim().endsWith("?")).length;
  const definition = /\b(is|are) (a|an|the)\b/i.test(paras.slice(0, 3).join(" "));
  const all = [p.title, p.excerpt, ...headings, body, ...(p.keyTakeaways || []), ...(p.faqs || []).flatMap((f) => [f.question, f.answer])].join(" ");
  const slop = SLOP.filter((w) => all.toLowerCase().includes(w));
  const dashes = (all.match(/[\u2013\u2014]/g) || []).length;
  const anecdote = ANECDOTE.test(all);
  const year = /\b2026\b/.test(p.title + " " + body);

  const seo = [
    ["Keyword in title", has(p.title, kw), 10], ["Keyword in SEO title", has(p.metaTitle, kw), 8],
    ["SEO title 30-60 chars", (p.metaTitle || "").length >= 30 && (p.metaTitle || "").length <= 60, 8],
    ["Meta description 120-160 chars", (p.metaDescription || "").length >= 120 && (p.metaDescription || "").length <= 160, 8],
    ["Keyword in meta description", has(p.metaDescription, kw), 6], ["Keyword in URL", has(p.slug.replace(/-/g, " "), kw), 8],
    ["Short URL (60 chars or less)", p.slug.length <= 60, 6], ["Keyword in first 100 words", has(first100, kw), 8],
    ["Keyword in a subheading", headings.some((h) => has(h, kw)), 6], ["1,200+ words", words >= 1200, 8],
    ["3+ subheadings", headings.length >= 3, 4], ["3+ internal links", internal >= 3, 8],
    ["Featured image with alt text", !!(p.img && p.alt), 6], ["Keyword density 0.5-2.5%", density >= 0.5 && density <= 2.5, 6],
  ];
  const aeo = [
    ["Short direct answer up front (first paragraph under 80 words)", firstPara > 0 && firstPara <= 80, 15],
    ["Structured FAQ (4+ Q&As with FAQ schema)", faqs >= 4, 30], ["2+ question-style headings", qHeadings >= 2, 15],
    ["Lists or steps", lists >= 1, 15], ["A comparison or data table", tables >= 1, 15], ["Defines the topic early", definition, 10],
  ];
  const geo = [
    ["Cites 2+ external sources", external.length >= 2, 20], ["Cites an official/authoritative source", authority >= 1, 20],
    ["Specific numbers and figures (10+)", numbers >= 10, 15], ["Key takeaways summary", (p.keyTakeaways || []).length >= 3, 20],
    ["Current year referenced", year, 10], ["Names Vistrow's products or services", /ArthaLeads|Vistrow Voice|Vistrow/.test(body), 15],
  ];
  const human = [
    ["No AI filler words", slop.length === 0, 40], ["No em or en dashes", dashes === 0, 30], ["No invented first-hand anecdotes", !anecdote, 30],
  ];
  const pct = (list) => Math.round((list.reduce((t, [, ok, w]) => t + (ok ? w : 0), 0) * 100) / list.reduce((t, [, , w]) => t + w, 0));
  return { title: p.title, slug: p.slug, date: p.publishedAt, words, faqs, internal, external: external.length, seo: pct(seo), aeo: pct(aeo), geo: pct(geo), human: pct(human), slop, fails: [...seo, ...aeo, ...geo, ...human].filter(([, ok]) => !ok).map(([l]) => l) };
}

const rows = posts.map(score);
const out = process.argv.indexOf("--json");
if (out > -1) fs.writeFileSync(process.argv[out + 1], JSON.stringify(rows, null, 1));
const avg = (k) => Math.round(rows.reduce((t, r) => t + r[k], 0) / rows.length);
console.log(`${rows.length} live posts. Average SEO ${avg("seo")} · AEO ${avg("aeo")} · GEO ${avg("geo")} · Human ${avg("human")}\n`);
for (const r of rows) console.log(`${r.date} SEO ${String(r.seo).padStart(3)} AEO ${String(r.aeo).padStart(3)} GEO ${String(r.geo).padStart(3)} HUM ${String(r.human).padStart(3)}  ${r.words}w faq:${r.faqs} in:${r.internal} ext:${r.external}  ${r.title.slice(0, 60)}`);
const tally = {}; rows.forEach((r) => r.fails.forEach((f) => (tally[f] = (tally[f] || 0) + 1)));
console.log("\nMost common failures:"); Object.entries(tally).sort((a, b) => b[1] - a[1]).forEach(([f, n]) => console.log(`  ${String(n).padStart(2)} posts: ${f}`));
