import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";

const root = process.cwd();
const sourcePath = path.join(root, "content", "blog.ts");
const outputPath = path.join(root, "studio", "migrations", "blog-posts.ndjson");
const source = fs.readFileSync(sourcePath, "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2020,
  },
}).outputText;

const module = { exports: {} };
vm.runInNewContext(compiled, {
  module,
  exports: module.exports,
  require: () => ({}),
});

const keywordMap = {
  "speed-to-lead-why-response-time-decides-deals": {
    focus: "speed to lead",
    secondary: ["lead response time", "instant lead follow-up", "sales conversion"],
  },
  "why-most-crm-implementations-fail": {
    focus: "CRM implementation",
    secondary: ["CRM adoption", "sales process", "CRM strategy"],
  },
  "ai-voice-calling-what-it-can-and-cant-do": {
    focus: "AI voice calling",
    secondary: ["AI voice agent", "lead qualification", "automated sales calls"],
  },
  "marketing-attribution-that-sales-will-actually-trust": {
    focus: "marketing attribution",
    secondary: ["CRM attribution", "conversion tracking", "marketing ROI"],
  },
  "when-to-automate-and-when-not-to": {
    focus: "business process automation",
    secondary: ["workflow automation", "automation strategy", "business operations"],
  },
  "connected-marketing-system-what-it-actually-means": {
    focus: "connected marketing system",
    secondary: ["marketing automation", "CRM integration", "revenue attribution"],
  },
};

const documents = module.exports.blogPosts.map((post) => ({
  _id: `blogPost-${post.slug}`,
  _type: "blogPost",
  title: post.title,
  slug: { _type: "slug", current: post.slug },
  excerpt: post.excerpt,
  category: post.category,
  author: post.author,
  publishedAt: post.date,
  readTime: post.readTime,
  metaTitle: post.metaTitle,
  metaDescription: post.metaDescription,
  focusKeyword: keywordMap[post.slug]?.focus,
  secondaryKeywords: keywordMap[post.slug]?.secondary || [],
  breadcrumbTitle: post.metaTitle,
  schemaType: "BlogPosting",
  twitterCard: "summary_large_image",
  robotsIndex: true,
  robotsFollow: true,
  robotsNoArchive: false,
  robotsNoImageIndex: false,
  robotsNoSnippet: false,
  robotsMaxSnippet: -1,
  robotsMaxVideoPreview: -1,
  robotsMaxImagePreview: "large",
  excludeFromSitemap: false,
  redirectPermanent: true,
  sections: post.sections.map((section, index) => ({
    _key: `section-${index + 1}`,
    _type: "blogSection",
    ...(section.heading ? { heading: section.heading } : {}),
    paragraphs: section.paragraphs,
    ...(section.points ? { points: section.points } : {}),
  })),
}));

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(
  outputPath,
  `${documents.map((document) => JSON.stringify(document)).join("\n")}\n`,
);

console.log(`Prepared ${documents.length} blog posts for Sanity.`);
