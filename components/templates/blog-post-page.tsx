import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/ui/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import BlurText from "@/components/ui/blur-text";
import type { BlogPost } from "@/lib/content-types";
import { articleSchema, breadcrumbSchema, graph } from "@/lib/structured-data";

export function BlogPostPage({
  post,
  morePosts,
}: {
  post: BlogPost;
  morePosts: BlogPost[];
}) {
  const displayDate = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <JsonLd
        data={graph([
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
          articleSchema({
            title: post.title,
            description: post.metaDescription,
            path: `/blog/${post.slug}`,
            author: post.author,
            datePublished: post.date,
          }),
        ])}
      />

      <article className="py-14 lg:py-20">
        <div className="container-edge">
          <div className="mx-auto max-w-reading">
            <Breadcrumb
              items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.title }]}
            />

            <span className="eyebrow mt-6 inline-block">{post.category}</span>
            <h1 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-ink">
              <BlurText as="span" text={post.title} delay={58} stepDuration={0.3} direction="top" />
            </h1>
            <div className="mt-5 flex items-center gap-2 font-sans text-sm text-muted">
              <span>{post.author}</span>
              <span aria-hidden>·</span>
              <time dateTime={post.date}>{displayDate}</time>
              <span aria-hidden>·</span>
              <span>{post.readTime}</span>
            </div>

            <div className="mt-10 space-y-8">
              {post.sections.map((section, i) => (
                <Reveal key={i} delay={Math.min(i, 3) * 0.05}>
                  <div>
                    {section.heading && (
                      <h2 className="font-display text-xl font-bold text-ink">{section.heading}</h2>
                    )}
                    <div className={`space-y-4 font-sans text-base leading-relaxed text-ink-2 ${section.heading ? "mt-3" : ""}`}>
                      {section.paragraphs.map((p, j) => (
                        <p key={j}>{p}</p>
                      ))}
                    </div>
                    {section.points && (
                      <ul className="mt-4 space-y-2">
                        {section.points.map((point) => (
                          <li key={point} className="flex items-start gap-2.5 font-sans text-base text-ink-2">
                            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-strong" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-12 border-t border-line pt-6">
              <Link href="/blog" className="btn-ghost">
                <ArrowLeft className="h-4 w-4" strokeWidth={2} />
                Back to all posts
              </Link>
            </div>
          </div>
        </div>
      </article>

      {morePosts.length > 0 && (
        <section className="border-t border-line bg-surface py-section">
          <div className="container-edge">
            <h2 className="font-display text-h3 text-ink">More from the blog</h2>
            <div className="mt-8 grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-3">
              {morePosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="glass glass-hover group flex h-full flex-col rounded-lg p-6"
                >
                  <span className="rounded-full bg-accent-tint px-2.5 py-1 font-sans text-[11px] font-semibold text-accent-ink">
                    {related.category}
                  </span>
                  <h3 className="mt-4 flex-1 font-display text-base font-bold leading-snug text-ink">
                    {related.title}
                  </h3>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-accent-strong">
                    Read more <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
