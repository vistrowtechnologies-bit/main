import { unstable_cache } from "next/cache";
import { blogPosts as localBlogPosts } from "@/content/blog";
import type { BlogPost } from "@/lib/content-types";
import { sanityClient } from "@/lib/sanity/client";
import {
  sanityDataset,
  sanityProjectId,
} from "@/lib/sanity/config";
import { blogPostsQuery } from "@/lib/sanity/queries";

const fetchPublishedBlogPosts = unstable_cache(
  () => sanityClient.fetch<BlogPost[]>(blogPostsQuery),
  ["sanity-blog-posts", sanityProjectId, sanityDataset],
  { revalidate: 60, tags: ["sanity-blog-posts"] },
);

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts = await fetchPublishedBlogPosts();
    if (posts.length > 0) return posts;
  } catch {
    // Keep the public blog available if Sanity is temporarily unreachable.
  }

  return [...localBlogPosts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug);
}
