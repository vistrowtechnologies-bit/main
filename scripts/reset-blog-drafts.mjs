import { writeFile } from "node:fs/promises";
import { createClient } from "@sanity/client";

const apply = process.argv.includes("--apply");
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "uenz7w4c",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-07-21",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  perspective: "raw",
});

const [drafts, pending, published] = await Promise.all([
  client.fetch(`*[_type == "blogPost" && _id in path("drafts.**")]`),
  client.fetch(`*[_type == "contentCalendarEntry" && status == "pending"]`),
  client.fetch(`count(*[_type == "blogPost" && !(_id in path("drafts.**"))])`),
]);
console.log(JSON.stringify({ drafts: drafts.length, pendingCalendarEntries: pending.length, publishedPosts: published, apply }));
if (!apply) process.exit(0);

const backupPath = `/Users/mac15/Downloads/vistrow-unpublished-backup-${new Date().toISOString().replace(/[:.]/g, "-")}.json`;
await writeFile(backupPath, JSON.stringify({ savedAt: new Date().toISOString(), drafts, pending }, null, 2));
console.log(`Backup: ${backupPath}`);

for (const doc of [...drafts, ...pending]) await client.delete(doc._id);
const [remainingDrafts, remainingPending, publishedAfter] = await Promise.all([
  client.fetch(`count(*[_type == "blogPost" && _id in path("drafts.**")])`),
  client.fetch(`count(*[_type == "contentCalendarEntry" && status == "pending"])`),
  client.fetch(`count(*[_type == "blogPost" && !(_id in path("drafts.**"))])`),
]);
console.log(JSON.stringify({ remainingDrafts, remainingPending, publishedAfter }));
if (remainingDrafts || remainingPending || publishedAfter !== published) throw new Error("Sanity reset verification failed");
