import { defineField, defineType } from "sanity";

const categories = [
  "AI Voice",
  "Business Automation",
  "Conversion Tracking",
  "CRM & Automation",
  "Digital Marketing",
  "Lead Generation",
  "Strategy",
];

const MIN_INSIGHT_LENGTH = 200;

// One planned blog post from the keyword plan. The blog cron only writes a post for an entry once
// the team has added a first-hand insight (200+ characters) - no insight, no post. It then writes
// one long-form draft built around that insight, at most once every 3 days, in Planned Order.
export const contentCalendarEntry = defineType({
  name: "contentCalendarEntry",
  title: "Content Calendar Entry",
  type: "document",
  groups: [
    { name: "insight", title: "Your insight", default: true },
    { name: "keyword", title: "Keyword research" },
    { name: "system", title: "System" },
  ],
  fields: [
    defineField({
      name: "insight",
      title: "Your insight",
      type: "text",
      rows: 12,
      group: "insight",
      description:
        "What only Vistrow knows about this topic: real numbers, a client situation (no names unless approved), the steps you actually follow, a mistake you keep seeing, your honest opinion. The post is built around this and won't be written until it has 200+ characters. Bullet notes are fine.",
      validation: (rule) =>
        rule.custom((value) => {
          if (!value) return true;
          return value.trim().length >= MIN_INSIGHT_LENGTH
            ? true
            : `Add a bit more detail - the post is only written once this has ${MIN_INSIGHT_LENGTH}+ characters (currently ${value.trim().length}).`;
        }).warning(),
    }),
    defineField({
      name: "insightNeeded",
      title: "What to include",
      type: "text",
      rows: 3,
      group: "insight",
      readOnly: true,
      description: "The first-hand detail that would make this post better than what currently ranks.",
    }),
    defineField({ name: "title", title: "Planned Title", type: "string", group: "keyword", validation: (rule) => rule.required() }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "keyword",
      options: { list: categories },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "focusKeyword",
      title: "Primary Keyword",
      type: "string",
      group: "keyword",
      description: "2-4 words, exactly as people search it.",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "secondaryKeywords", title: "Secondary Keywords", type: "array", of: [{ type: "string" }], group: "keyword", options: { layout: "tags" } }),
    defineField({
      name: "searchIntent",
      title: "Search Intent",
      type: "string",
      group: "keyword",
      options: { list: ["informational", "commercial", "transactional", "local"] },
    }),
    defineField({ name: "estMonthlySearches", title: "Est. Monthly Searches", type: "string", group: "keyword", description: "Estimated range, not an exact figure. Replace with Keyword Planner numbers when available." }),
    defineField({ name: "difficulty", title: "Difficulty", type: "string", group: "keyword", options: { list: ["low", "medium", "high"] } }),
    defineField({ name: "difficultyReason", title: "Who ranks today", type: "text", rows: 2, group: "keyword" }),
    defineField({ name: "linkTo", title: "Main Page to Link", type: "string", group: "keyword", description: "The Vistrow page this post should send readers to, e.g. /products/arthaleads." }),
    defineField({ name: "angle", title: "Angle", type: "text", rows: 3, group: "keyword" }),
    defineField({ name: "sourceUrl", title: "Source URL", type: "url", group: "keyword" }),
    defineField({ name: "dayIndex", title: "Planned Order", type: "number", group: "system", description: "Lower numbers are written first." }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      group: "system",
      options: { list: ["needs-insight", "used", "archived"] },
      description: "Set to archived to drop a topic. 'used' is set automatically once its draft is written.",
    }),
    defineField({ name: "failedRuns", title: "Failed Runs", type: "number", group: "system", description: "After 3 failures the topic is skipped. Reset to 0 after fixing it." }),
    defineField({ name: "lastError", title: "Last Error", type: "text", rows: 3, group: "system", readOnly: true }),
    defineField({ name: "createdAt", title: "Created At", type: "datetime", group: "system", readOnly: true }),
    defineField({ name: "usedAt", title: "Used At", type: "datetime", group: "system", readOnly: true }),
    defineField({ name: "blogPostId", title: "Blog Post Doc ID", type: "string", group: "system", readOnly: true }),
  ],
  orderings: [{ title: "Planned order", name: "dayIndexAsc", by: [{ field: "dayIndex", direction: "asc" }] }],
  preview: {
    select: { title: "title", status: "status", dayIndex: "dayIndex", insight: "insight", keyword: "focusKeyword", volume: "estMonthlySearches", failedRuns: "failedRuns" },
    prepare({ title, status, dayIndex, insight, keyword, volume, failedRuns }) {
      const ready = typeof insight === "string" && insight.trim().length >= MIN_INSIGHT_LENGTH;
      const icon =
        status === "used" ? "✅" : status === "archived" ? "🗄️" : (failedRuns ?? 0) >= 3 ? "⚠️" : ready ? "🟢" : "✍️";
      const label =
        status === "used" ? "written" : status === "archived" ? "archived" : (failedRuns ?? 0) >= 3 ? "failed 3x - check Last Error" : ready ? "ready to write" : "needs your insight";
      return {
        title: `${icon} ${dayIndex ?? "-"}. ${title ?? "Untitled"}`,
        subtitle: [label, keyword, volume ? `~${volume}/mo` : null].filter(Boolean).join(" · "),
      };
    },
  },
});
