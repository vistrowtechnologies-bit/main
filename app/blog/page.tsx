import type { Metadata } from "next";
import { BlogIndexPage } from "@/components/templates/blog-index-page";
import { blogPosts } from "@/content/blog";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description:
    "Specific, unhyped write-ups on marketing, CRM, AI voice, and automation from the Vistrow team.",
  path: "/blog",
});

export default function Page() {
  const posts = [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1));
  return <BlogIndexPage posts={posts} />;
}
