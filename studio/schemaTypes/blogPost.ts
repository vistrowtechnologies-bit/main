import { defineArrayMember, defineField, defineType } from "sanity";

const categories = [
  "AI Voice",
  "Business Automation",
  "Conversion Tracking",
  "CRM & Automation",
  "Lead Generation",
  "Strategy",
];

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Summary",
      description: "Displayed on the blog index and below the article title.",
      type: "text",
      rows: 4,
      group: "content",
      validation: (rule) => rule.required().min(80).max(320),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "content",
      options: { list: categories, layout: "dropdown" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      group: "content",
      initialValue: "Vistrow Team",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Publication Date",
      type: "date",
      group: "content",
      options: { dateFormat: "MMMM D, YYYY" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "readTime",
      title: "Reading Time",
      type: "string",
      group: "content",
      initialValue: "5 min read",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "sections",
      title: "Article Sections",
      type: "array",
      group: "content",
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          name: "blogSection",
          title: "Section",
          type: "object",
          fields: [
            defineField({
              name: "heading",
              title: "Heading",
              type: "string",
              description: "Optional for the opening section.",
            }),
            defineField({
              name: "paragraphs",
              title: "Paragraphs",
              type: "array",
              validation: (rule) => rule.required().min(1),
              of: [defineArrayMember({ type: "text", rows: 5 })],
            }),
            defineField({
              name: "points",
              title: "Key Points",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
            }),
          ],
          preview: {
            select: { title: "heading", paragraphs: "paragraphs" },
            prepare({ title, paragraphs }) {
              return {
                title: title || "Opening section",
                subtitle: Array.isArray(paragraphs) ? paragraphs[0] : "",
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "metaTitle",
      title: "SEO Title",
      type: "string",
      group: "seo",
      description: "Keep this near 50 to 60 characters.",
      validation: (rule) => rule.required().max(65),
    }),
    defineField({
      name: "metaDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,
      group: "seo",
      description: "Keep this near 140 to 160 characters.",
      validation: (rule) => rule.required().max(170),
    }),
  ],
  orderings: [
    {
      title: "Publication date, newest",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      category: "category",
      date: "publishedAt",
      media: "featuredImage",
    },
    prepare({ title, category, date, media }) {
      return {
        title,
        subtitle: [category, date].filter(Boolean).join(" | "),
        media,
      };
    },
  },
});
