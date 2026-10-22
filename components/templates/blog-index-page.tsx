import { CtaBand } from "@/components/sections/cta-band";
import { BlogHub } from "@/components/blog/blog-hub";
import { JsonLd } from "@/components/seo/json-ld";
import type { BlogPost } from "@/lib/content-types";
import { breadcrumbSchema, collectionSchema, graph } from "@/lib/structured-data";

export function BlogIndexPage({ posts, page = 1 }: { posts: BlogPost[]; page?: number }) {
  return (
    <>
      <JsonLd
        data={graph([
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            ...(page > 1 ? [{ name: `Page ${page}`, path: `/blog/page/${page}` }] : []),
          ]),
          collectionSchema({
            name: "Blog",
            description: "Notes on marketing, CRM, AI voice, and automation from the Vistrow team.",
            path: page > 1 ? `/blog/page/${page}` : "/blog",
            items: posts.map((post) => ({ name: post.title, path: `/blog/${post.slug}` })),
          }),
        ])}
      />
      <BlogHub posts={posts} page={page} />

      <CtaBand />
    </>
  );
}
