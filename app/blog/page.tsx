import type { Metadata } from "next";
import { BlogIndexPage } from "@/components/templates/blog-index-page";
import { buildMetadata } from "@/lib/seo";
import { getBlogPosts } from "@/lib/sanity/blog";

export const metadata: Metadata = buildMetadata({
  title: "Marketing, CRM and Automation Insights",
  description:
    "Practical insights on digital marketing, CRM, AI voice, lead generation, conversion tracking and business automation from the Vistrow team.",
  path: "/blog",
});

export const revalidate = 60;

export default async function Page() {
  const posts = await getBlogPosts();
  return <BlogIndexPage posts={posts} />;
}
