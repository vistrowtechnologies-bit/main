import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/ui/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import BlurText from "@/components/ui/blur-text";
import type { BlogPost } from "@/lib/content-types";
import { articleSchema, breadcrumbSchema, graph } from "@/lib/structured-data";
import { BlogExplorer } from "@/components/blog/blog-explorer";

export function BlogPostPage({
  post,
  morePosts,
  allPosts,
}: {
  post: BlogPost;
  morePosts: BlogPost[];
  allPosts: BlogPost[];
}) {
  const displayDate = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const headings = post.sections
    .filter((section): section is typeof section & { heading: string } => Boolean(section.heading))
    .map((section) => ({ id: headingId(section.heading), label: section.heading }));
  const explorerPosts = allPosts.map(({ slug, title, excerpt, category, date, readTime }) => ({
    slug,
    title,
    excerpt,
    category,
    date,
    readTime,
  }));

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

      <article className="py-12 lg:py-20">
        <div className="container-edge">
          <div className="mx-auto max-w-[1110px]">
            <Breadcrumb
              items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.title }]}
            />

            <span className="mt-8 inline-flex rounded-full border border-accent/45 bg-accent/10 px-3 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-strong">
              {post.category}
            </span>

            <div className="mt-5 grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,760px)_300px] lg:gap-12">
              <div className="min-w-0">
                <header>
                <h1 className="font-display text-[clamp(2.15rem,4.4vw,3.75rem)] font-extrabold leading-[1.06] tracking-[-0.035em] text-ink">
                  <BlurText as="span" text={post.title} delay={58} stepDuration={0.3} direction="top" />
                </h1>
                <div className="mt-6 flex flex-wrap items-center gap-2 font-sans text-sm text-muted">
                  <span>{post.author}</span>
                  <span aria-hidden>·</span>
                  <time dateTime={post.date}>{displayDate}</time>
                  <span aria-hidden>·</span>
                  <span>{post.readTime}</span>
                </div>
                <p className="mt-7 border-l-2 border-accent pl-5 font-sans text-lg leading-relaxed text-muted">
                  {post.excerpt}
                </p>
                </header>

              <div className="mt-8 lg:hidden">
                <BlogExplorer
                  posts={explorerPosts}
                  currentSlug={post.slug}
                  currentCategory={post.category}
                  headings={headings}
                />
              </div>

              <div className="mt-12 space-y-10">
                {post.sections.map((section, i) => (
                  <Reveal key={i} delay={Math.min(i, 3) * 0.05}>
                    <section id={section.heading ? headingId(section.heading) : undefined} className="scroll-mt-32">
                      {section.heading && (
                        <h2 className="font-display text-[clamp(1.4rem,2.2vw,1.85rem)] font-bold tracking-[-0.02em] text-ink">
                          {section.heading}
                        </h2>
                      )}
                      <div className={`space-y-5 font-sans text-[17px] leading-[1.8] text-ink-2 ${section.heading ? "mt-4" : ""}`}>
                        {section.paragraphs.map((p, j) => (
                          <p key={j}>{p}</p>
                        ))}
                      </div>
                      {section.points && (
                        <ul className="mt-5 space-y-3 rounded-lg border border-line bg-surface/70 p-5">
                          {section.points.map((point) => (
                            <li key={point} className="flex items-start gap-3 font-sans text-[15px] leading-relaxed text-ink-2">
                              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent shadow-[0_0_8px_rgb(var(--accent)/0.45)]" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      )}
                    </section>
                  </Reveal>
                ))}
              </div>

              <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-7 sm:flex-row sm:items-center">
                <Link href="/blog" className="btn-ghost">
                  <ArrowLeft className="h-4 w-4" strokeWidth={2} />
                  Back to all posts
                </Link>
                <Link href="/growth-audit" className="btn-secondary px-5 py-2.5">
                  Apply this to your business
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </Link>
              </div>
              </div>

              <aside className="hidden lg:sticky lg:top-28 lg:block" aria-label="Blog navigation">
                <BlogExplorer
                  posts={explorerPosts}
                  currentSlug={post.slug}
                  currentCategory={post.category}
                  headings={headings}
                />
              </aside>
            </div>
          </div>
        </div>
      </article>

      {morePosts.length > 0 && (
        <section className="border-t border-line bg-surface py-section">
          <div className="container-edge">
            <div className="max-w-2xl">
              <p className="eyebrow">Keep reading</p>
              <h2 className="mt-3 font-display text-h3 text-ink">Suggested articles for you</h2>
              <p className="mt-3 font-sans text-muted">
                Continue with practical notes on connected marketing, CRM, AI voice, and automation.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-3">
              {morePosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="glass glass-hover group flex h-full flex-col rounded-lg p-6"
                >
                  <span className="w-fit rounded-full bg-accent-tint px-2.5 py-1 font-sans text-[11px] font-semibold text-accent-ink">
                    {related.category}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold leading-snug text-ink">
                    {related.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 flex-1 font-sans text-sm leading-relaxed text-muted">
                    {related.excerpt}
                  </p>
                  <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
                    <span className="font-sans text-xs text-muted">{related.readTime}</span>
                    <span className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-accent-strong">
                      Read more <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                    </span>
                  </div>
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

function headingId(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
