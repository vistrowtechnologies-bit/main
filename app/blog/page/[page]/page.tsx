import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { BlogIndexPage } from "@/components/templates/blog-index-page";
import { blogPageCount } from "@/lib/blog-paging";
import { buildMetadata } from "@/lib/seo";
import { getBlogPosts } from "@/lib/sanity/blog";

// /blog/page/2, /blog/page/3 ...: 12 posts per page after the featured block on /blog.
export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return Array.from({ length: Math.max(0, blogPageCount(posts.length) - 1) }, (_, i) => ({ page: String(i + 2) }));
}

export async function generateMetadata({ params }: { params: { page: string } }): Promise<Metadata> {
  return buildMetadata({
    title: `Marketing, CRM and Automation Insights - Page ${params.page}`,
    description: `Page ${params.page} of practical guides on digital marketing, CRM, AI voice, lead generation and automation from the Vistrow team.`,
    path: `/blog/page/${params.page}`,
  });
}

export default async function Page({ params }: { params: { page: string } }) {
  const page = Number(params.page);
  if (page === 1) permanentRedirect("/blog");
  const posts = await getBlogPosts();
  if (!Number.isInteger(page) || page < 2 || page > blogPageCount(posts.length)) notFound();
  return <BlogIndexPage posts={posts} page={page} />;
}
