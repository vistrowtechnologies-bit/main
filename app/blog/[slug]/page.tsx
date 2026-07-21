import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostPage } from "@/components/templates/blog-post-page";
import { buildMetadata } from "@/lib/seo";
import { getBlogPost, getBlogPosts } from "@/lib/sanity/blog";

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  if (!post) return {};
  return buildMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
    path: `/blog/${post.slug}`,
  });
}

export default async function Page({ params }: { params: { slug: string } }) {
  const [post, blogPosts] = await Promise.all([
    getBlogPost(params.slug),
    getBlogPosts(),
  ]);
  if (!post) notFound();
  const morePosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => {
      const aRelated = a.category === post.category ? 1 : 0;
      const bRelated = b.category === post.category ? 1 : 0;
      if (aRelated !== bRelated) return bRelated - aRelated;
      return a.date < b.date ? 1 : -1;
    })
    .slice(0, 3);
  return <BlogPostPage post={post} morePosts={morePosts} allPosts={blogPosts} />;
}
