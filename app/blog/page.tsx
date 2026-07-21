import type { Metadata } from "next";
import { BlogIndexPage } from "@/components/templates/blog-index-page";
import { buildMetadata } from "@/lib/seo";
import { getBlogPosts } from "@/lib/sanity/blog";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description:
    "Specific, unhyped write-ups on marketing, CRM, AI voice, and automation from the Vistrow team.",
  path: "/blog",
});

export const revalidate = 60;

export default async function Page() {
  const posts = await getBlogPosts();
  return <BlogIndexPage posts={posts} />;
}
