import { BookOpen } from "lucide-react";
import { LinkCardGrid } from "@/components/sections/link-card-grid";
import { getMarketPosts } from "@/lib/sanity/blog";

// Latest blog guides written for one market. Renders nothing until the first one is live, so no empty section shows.
export async function MarketGuides({ market, label }: { market: "US" | "UK"; label: string }) {
  const posts = await getMarketPosts(market);
  if (posts.length === 0) return null;
  return (
    <LinkCardGrid
      eyebrow="From the blog"
      title={`Guides for ${label}`}
      cards={posts.map((post) => ({ label: post.title, href: `/blog/${post.slug}`, body: post.excerpt, icon: BookOpen }))}
    />
  );
}
