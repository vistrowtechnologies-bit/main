import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/ui/reveal";
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
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Blog" }]}
        eyebrow="Blog"
        title="Notes on marketing,"
        highlight="CRM, and automation"
        subtitle="Specific, unhyped write-ups on what actually moves pipeline - from the team building the systems behind it."
        secondaryCta={{ label: "Talk to Vistrow", href: "/contact" }}
      />

      <section className="py-section">
        <div className="container-edge">
          <div className="grid grid-cols-1 gap-gutter md:grid-cols-2">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 2) * 0.07}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="glass glass-hover group flex h-full flex-col rounded-lg p-7"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="rounded-full bg-accent-tint px-3 py-1 font-sans text-xs font-semibold text-accent-ink">
                      {post.category}
                    </span>
                    <ArrowUpRight
                      className="h-5 w-5 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      strokeWidth={2}
                    />
                  </div>
                  <h2 className="mt-5 font-display text-xl font-bold leading-snug text-ink">
                    {post.title}
                  </h2>
                  <p className="mt-3 flex-1 font-sans text-sm leading-relaxed text-muted">
                    {post.excerpt}
                  </p>
                  <div className="mt-6 flex items-center gap-2 border-t border-line pt-4 font-sans text-xs text-muted">
                    <span>{post.author}</span>
                    <span aria-hidden>·</span>
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                    <span aria-hidden>·</span>
                    <span>{post.readTime}</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
