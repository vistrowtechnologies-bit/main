import { defineArrayMember, defineField } from "sanity";

// Posts created on or after this date must carry real in-article visuals before they can be
// published. Older posts are left alone so editing them doesn't suddenly fail validation.
export const VISUALS_REQUIRED_FROM = "2026-10-13";
export const MIN_IN_ARTICLE_IMAGES = 1;
export const MIN_IN_ARTICLE_VISUALS = 3;

type SectionLike = {
  image?: { asset?: unknown };
  table?: { rows?: unknown[] };
  steps?: unknown[];
};

export function countVisuals(sections: SectionLike[] | undefined) {
  const list = sections ?? [];
  const images = list.filter((section) => Boolean(section.image?.asset)).length;
  const tables = list.filter((section) => (section.table?.rows?.length ?? 0) > 0).length;
  const diagrams = list.filter((section) => (section.steps?.length ?? 0) > 0).length;
  return { images, tables, diagrams, total: images + tables + diagrams };
}

export function visualsRequired(createdAt: string | undefined) {
  return !createdAt || createdAt.slice(0, 10) >= VISUALS_REQUIRED_FROM;
}

// Problems that block publishing a new post. Empty when the post is ready.
export function visualProblems(doc: { _createdAt?: string; sections?: SectionLike[]; featuredImage?: { asset?: unknown } }) {
  if (!visualsRequired(doc._createdAt)) return [];
  const counts = countVisuals(doc.sections);
  const problems: string[] = [];
  if (!doc.featuredImage?.asset) problems.push("Add a featured image.");
  if (counts.images < MIN_IN_ARTICLE_IMAGES)
    problems.push(`Add at least ${MIN_IN_ARTICLE_IMAGES} real image inside the article (a screenshot or photo of real work) next to the text it supports.`);
  if (counts.total < MIN_IN_ARTICLE_VISUALS)
    problems.push(`Use at least ${MIN_IN_ARTICLE_VISUALS} visuals inside the article (images, tables or step diagrams) - currently ${counts.total}.`);
  return problems;
}

export const sectionVisualFields = [
  defineField({
    name: "image",
    title: "Image",
    type: "image",
    description: "A real screenshot, photo or chart shown after this section's text. Use original visuals, not stock or generic AI art.",
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Alternative Text",
        type: "string",
        description: "Describe what the image shows, for search engines and screen readers.",
        validation: (rule) => rule.required(),
      }),
      defineField({ name: "caption", title: "Caption", type: "string", description: "Shown under the image. Explain what the reader should notice." }),
    ],
  }),
  defineField({
    name: "table",
    title: "Table",
    type: "object",
    description: "Prices, comparisons or line items. Google can read tables, unlike text inside an image.",
    fields: [
      defineField({ name: "caption", title: "Caption", type: "string" }),
      defineField({ name: "columns", title: "Column Headings", type: "array", of: [defineArrayMember({ type: "string" })] }),
      defineField({
        name: "rows",
        title: "Rows",
        type: "array",
        of: [
          defineArrayMember({
            name: "tableRow",
            type: "object",
            fields: [defineField({ name: "cells", title: "Cells", type: "array", of: [defineArrayMember({ type: "string" })] })],
            preview: {
              select: { cells: "cells" },
              prepare: ({ cells }) => ({ title: Array.isArray(cells) ? cells.join(" | ") : "Empty row" }),
            },
          }),
        ],
      }),
    ],
  }),
  defineField({
    name: "steps",
    title: "Step Diagram",
    type: "array",
    description: "A process or timeline, shown as a numbered visual.",
    of: [
      defineArrayMember({
        name: "diagramStep",
        type: "object",
        fields: [
          defineField({ name: "title", title: "Step", type: "string", validation: (rule) => rule.required() }),
          defineField({ name: "body", title: "Detail", type: "string" }),
        ],
      }),
    ],
  }),
];

export const visualChecklistField = defineField({
  name: "visualChecklist",
  title: "Visuals Checklist",
  type: "array",
  group: "content",
  description: "Visuals planned for this post. Add each one to its section above, then tick it off.",
  of: [
    defineArrayMember({
      name: "plannedVisual",
      type: "object",
      fields: [
        defineField({ name: "type", title: "Type", type: "string", options: { list: ["screenshot", "photo", "chart", "diagram", "table"] } }),
        defineField({ name: "afterSection", title: "Place After Section", type: "string" }),
        defineField({ name: "description", title: "What To Show", type: "text", rows: 2 }),
        defineField({ name: "done", title: "Added", type: "boolean", initialValue: false }),
      ],
      preview: {
        select: { type: "type", description: "description", done: "done", afterSection: "afterSection" },
        prepare: ({ type, description, done, afterSection }) => ({
          title: `${done ? "✅" : "⬜️"} ${type ?? "visual"}: ${description ?? ""}`,
          subtitle: afterSection ? `After: ${afterSection}` : undefined,
        }),
      },
    }),
  ],
});
