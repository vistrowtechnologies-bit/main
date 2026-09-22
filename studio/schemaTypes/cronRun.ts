import { defineField, defineType } from "sanity";

// Diagnostic record written by /api/cron/daily-blog on every invocation
// (success, error, or unauthorized) - not editorial content. Exists because
// Vercel's own request logs only retain 1-12 hours on the Hobby plan, which
// made a silently-failing daily cron undiagnosable after the fact.
export const cronRun = defineType({
  name: "cronRun",
  title: "Cron Run (diagnostic)",
  type: "document",
  fields: [
    defineField({ name: "route", title: "Route", type: "string", readOnly: true }),
    defineField({ name: "startedAt", title: "Started At", type: "datetime", readOnly: true }),
    defineField({ name: "durationMs", title: "Duration (ms)", type: "number", readOnly: true }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      readOnly: true,
      options: { list: ["ok", "error", "unauthorized"] },
    }),
    defineField({ name: "postsCreated", title: "Posts Created", type: "number", readOnly: true }),
    defineField({ name: "error", title: "Error", type: "text", readOnly: true }),
    defineField({ name: "log", title: "Log", type: "array", of: [{ type: "string" }], readOnly: true }),
  ],
  preview: {
    select: { status: "status", startedAt: "startedAt", postsCreated: "postsCreated" },
    prepare({ status, startedAt, postsCreated }) {
      return {
        title: `${status === "ok" ? "✅" : status === "unauthorized" ? "🔒" : "❌"} ${startedAt ? new Date(startedAt).toLocaleString() : ""}`,
        subtitle: status === "ok" ? `${postsCreated ?? 0} post(s) created` : status,
      };
    },
  },
});
