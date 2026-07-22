import { CtaBand } from "@/components/sections/cta-band";
import { BlogHub } from "@/components/blog/blog-hub";
import { JsonLd } from "@/components/seo/json-ld";
import type { BlogPost } from "@/lib/content-types";
import { breadcrumbSchema, collectionSchema, graph } from "@/lib/structured-data";

export function BlogIndexPage({ posts }: { posts: BlogPost[] }) {
  return (
    <>
      <JsonLd
        data={graph([
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ]),
          collectionSchema({
            name: "Blog",
            description: "Notes on marketing, CRM, AI voice, and automation from the Vistrow team.",
            path: "/blog",
            items: posts.map((post) => ({ name: post.title, path: `/blog/${post.slug}` })),
          }),
        ])}
      />
      <BlogHub posts={posts} />

      <CtaBand />
    </>
  );
}
