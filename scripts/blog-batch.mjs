// Generates a batch of scheduled blog posts, one calendar entry per day.
// Usage: node scripts/blog-batch.mjs <plan.json> [baseUrl]
//   plan.json: [{ "id": "<contentCalendarEntry _id>", "publishOn": "YYYY-MM-DD", "title": "..." }, ...]
//   baseUrl defaults to http://localhost:3000 (the dev server has no 5-minute function limit).
// Each entry needs a brief of 200+ characters in its "insight" field first.
// Reads CRON_SECRET from .env.local. Posts are published with their date and stay hidden until then.
import fs from "node:fs";

const [planFile, baseUrl = "http://localhost:3000"] = process.argv.slice(2);
if (!planFile) {
  console.error("Usage: node scripts/blog-batch.mjs <plan.json> [baseUrl]");
  process.exit(1);
}
const env = Object.fromEntries(
  fs
    .readFileSync(".env.local", "utf8")
    .split("\n")
    .filter((line) => line.includes("=") && !line.startsWith("#"))
    .map((line) => {
      const i = line.indexOf("=");
      return [line.slice(0, i).trim(), line.slice(i + 1).trim().replace(/^"|"$/g, "")];
    }),
);
const plan = JSON.parse(fs.readFileSync(planFile, "utf8"));

let failures = 0;
for (const item of plan) {
  const url = `${baseUrl}/api/cron/daily-blog?publishOn=${item.publishOn}&entry=${encodeURIComponent(item.id)}`;
  const started = Date.now();
  process.stdout.write(`${item.publishOn}  ${item.title}\n`);
  try {
    const response = await fetch(url, { headers: { Authorization: `Bearer ${env.CRON_SECRET}` }, signal: AbortSignal.timeout(900_000) });
    const result = await response.json().catch(() => ({}));
    const seconds = Math.round((Date.now() - started) / 1000);
    if (!response.ok || !result.ok || !result.created?.length) {
      failures++;
      console.log(`  FAILED (${response.status}, ${seconds}s): ${result.error || "no post created"}`);
      (result.log || []).slice(-4).forEach((line) => console.log(`    ${line}`));
    } else {
      console.log(`  OK (${seconds}s): ${result.created[0].studioUrl}`);
      (result.log || []).filter((line) => /image|Created/i.test(line)).forEach((line) => console.log(`    ${line}`));
    }
  } catch (error) {
    failures++;
    console.log(`  FAILED: ${String(error)}`);
  }
}
console.log(failures ? `\n${failures} of ${plan.length} failed.` : `\nAll ${plan.length} posts created.`);
process.exit(failures ? 1 : 0);
