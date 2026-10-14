import { defineArrayMember, defineField, defineType } from "sanity";

// Written monthly by /api/cron/seo-report from Google Search Console data. Read-only.
const queryRow = defineArrayMember({
  name: "seoQueryRow",
  type: "object",
  fields: [
    defineField({ name: "query", type: "string" }),
    defineField({ name: "page", type: "string" }),
    defineField({ name: "volume", title: "Monthly volume (Keyword Planner)", type: "string" }),
    defineField({ name: "position", type: "number" }),
    defineField({ name: "impressions", type: "number" }),
    defineField({ name: "clicks", type: "number" }),
  ],
  preview: {
    select: { query: "query", position: "position", impressions: "impressions", volume: "volume", page: "page" },
    prepare: ({ query, position, impressions, volume, page }) => ({
      title: `${query} · pos ${position}`,
      subtitle: [`${impressions} impressions`, volume ? `${volume}/mo` : null, page].filter(Boolean).join(" · "),
    }),
  },
});

export const seoReport = defineType({
  name: "seoReport",
  title: "SEO Report",
  type: "document",
  readOnly: true,
  fields: [
    defineField({ name: "periodStart", title: "From", type: "date" }),
    defineField({ name: "periodEnd", title: "To", type: "date" }),
    defineField({ name: "createdAt", type: "datetime" }),
    defineField({
      name: "totals",
      type: "object",
      fields: [
        defineField({ name: "clicks", type: "number" }),
        defineField({ name: "impressions", type: "number" }),
        defineField({ name: "averagePosition", title: "Average position", type: "number" }),
        defineField({ name: "pages", title: "Pages shown", type: "number" }),
      ],
    }),
    defineField({ name: "strikingDistance", title: "Quick wins (positions 5-30)", type: "array", of: [queryRow] }),
    defineField({
      name: "pagesToImprove",
      title: "Pages to improve",
      type: "array",
      of: [
        defineArrayMember({
          name: "seoPageRow",
          type: "object",
          fields: [
            defineField({ name: "page", type: "string" }),
            defineField({ name: "impressions", type: "number" }),
            defineField({ name: "position", type: "number" }),
            defineField({ name: "clicks", type: "number" }),
            defineField({ name: "reason", title: "Why", type: "string" }),
          ],
          preview: {
            select: { page: "page", position: "position", impressions: "impressions", reason: "reason" },
            prepare: ({ page, position, impressions, reason }) => ({ title: `${page} · pos ${position} · ${impressions} impressions`, subtitle: reason }),
          },
        }),
      ],
    }),
    defineField({ name: "topQueries", title: "Top searches", type: "array", of: [queryRow] }),
    defineField({ name: "plannedKeywordsNotRanking", title: "Researched keywords not showing yet", type: "array", of: [defineArrayMember({ type: "string" })] }),
  ],
  orderings: [{ title: "Newest", name: "periodEndDesc", by: [{ field: "periodEnd", direction: "desc" }] }],
  preview: {
    select: { end: "periodEnd", clicks: "totals.clicks", impressions: "totals.impressions", position: "totals.averagePosition" },
    prepare: ({ end, clicks, impressions, position }) => ({
      title: `SEO report to ${end}`,
      subtitle: `${clicks ?? 0} clicks · ${impressions ?? 0} impressions · avg position ${position ?? "-"}`,
    }),
  },
});
