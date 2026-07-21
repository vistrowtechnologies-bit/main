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
