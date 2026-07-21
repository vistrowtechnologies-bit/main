import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostPage } from "@/components/templates/blog-post-page";
import { blogPosts } from "@/content/blog";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return {};
  return buildMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
    path: `/blog/${post.slug}`,
  });
}

export default function Page({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
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
