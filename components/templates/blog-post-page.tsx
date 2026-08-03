import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/ui/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import BlurText from "@/components/ui/blur-text";
import type { BlogPost } from "@/lib/content-types";
import { articleSchema, breadcrumbSchema, graph } from "@/lib/structured-data";
import { BlogExplorer } from "@/components/blog/blog-explorer";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { ShareRow } from "@/components/blog/share-row";
import { siteUrl } from "@/lib/seo";

const MARKDOWN_LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

function renderInlineLinks(text: string) {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;

  for (const match of text.matchAll(MARKDOWN_LINK)) {
    const [full, label, href] = match;
    const index = match.index ?? 0;
    if (index > lastIndex) nodes.push(text.slice(lastIndex, index));

    const linkClasses = "font-semibold text-accent-strong underline decoration-accent/40 underline-offset-2 hover:decoration-accent";
    if (href.startsWith("/")) {
      nodes.push(
        <Link key={key++} href={href} className={linkClasses}>
          {label}
        </Link>,
      );
    } else {
      nodes.push(
        <a key={key++} href={href} target="_blank" rel="noopener noreferrer" className={linkClasses}>
          {label}
        </a>,
      );
    }
    lastIndex = index + full.length;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

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

  const articleUrl = `${siteUrl}/blog/${post.slug}`;
  const authorInitials = post.author
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <>
      <JsonLd
        data={graph([
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.breadcrumbTitle || post.title, path: `/blog/${post.slug}` },
          ]),
          articleSchema({
            title: post.title,
            description: post.metaDescription,
            path: `/blog/${post.slug}`,
            author: post.author,
            datePublished: post.date,
            dateModified: post.dateModified,
            schemaType: post.schemaType,
            image: post.featuredImage?.url,
            keywords: [post.focusKeyword, ...(post.secondaryKeywords || [])].filter(
              (keyword): keyword is string => Boolean(keyword),
            ),
            articleSection: post.category,
          }),
        ])}
      />

      <ReadingProgress targetId="article-body" />

      <article id="article-body" className="py-12 lg:py-20">
        <div className="container-edge">
          <div className="mx-auto max-w-[1110px]">
            <Breadcrumb
              items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.breadcrumbTitle || post.title }]}
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

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      aria-hidden
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink font-display text-xs font-bold text-inverse-ink dark:bg-accent dark:text-accent-ink"
                    >
                      {authorInitials}
                    </div>
                    <div className="font-sans text-sm leading-tight">
                      <p className="font-semibold text-ink">{post.author}</p>
                      <p className="mt-0.5 text-muted">
                        <time dateTime={post.date}>{displayDate}</time>
                        <span aria-hidden> · </span>
                        {post.readTime}
                      </p>
                    </div>
                  </div>
                  <ShareRow url={articleUrl} title={post.title} />
                </div>

                <p className="mt-7 border-l-2 border-accent pl-5 font-sans text-lg leading-relaxed text-muted">
                  {post.excerpt}
                </p>
                </header>

              {post.featuredImage?.url && (
                <div className="relative mt-9 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-line bg-surface">
                  <Image
                    src={post.featuredImage.url}
                    alt={post.featuredImage.alt || post.title}
                    fill
                    priority
                    sizes="(min-width: 1024px) 760px, 100vw"
                    className="object-cover"
                  />
                </div>
              )}

              <div className="mt-8 lg:hidden">
                <BlogExplorer
                  posts={explorerPosts}
                  currentSlug={post.slug}
                  currentCategory={post.category}
                  headings={headings}
                />
              </div>

              <div className="mt-12 divide-y divide-line">
                {(() => {
                  let headingCount = 0;
                  return post.sections.map((section, i) => {
                    if (section.heading) headingCount += 1;
                    const headingNumber = headingCount;
                    return (
                  <Reveal key={i} delay={Math.min(i, 3) * 0.05}>
                    <section
                      id={section.heading ? headingId(section.heading) : undefined}
                      className={`scroll-mt-32 ${i === 0 ? "pb-10" : "py-10"}`}
                    >
                      {section.heading && (
                        <div className="flex items-baseline gap-3">
                          <span className="font-display text-sm font-bold text-accent-strong">
                            {String(headingNumber).padStart(2, "0")}
                          </span>
                          <h2 className="font-display text-[clamp(1.4rem,2.2vw,1.85rem)] font-bold tracking-[-0.02em] text-ink">
                            {section.heading}
                          </h2>
                        </div>
                      )}
                      <div className={`space-y-5 font-sans text-[17px] leading-[1.8] text-ink-2 ${section.heading ? "mt-4" : ""}`}>
                        {section.paragraphs.map((p, j) => (
                          <p key={j}>{renderInlineLinks(p)}</p>
                        ))}
                      </div>
                      {section.points && section.points.length > 0 && (
                        <ul className="mt-5 space-y-3 rounded-lg border border-line bg-surface/70 p-5">
                          {section.points.map((point) => (
                            <li key={point} className="flex items-start gap-3 font-sans text-[15px] leading-relaxed text-ink-2">
                              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent shadow-[0_0_8px_rgb(var(--accent)/0.45)]" />
                              {renderInlineLinks(point)}
                            </li>
                          ))}
                        </ul>
                      )}
                    </section>
                  </Reveal>
                    );
                  });
                })()}
              </div>

              <div className="mt-4 flex flex-col items-start justify-between gap-4 border-t border-line pt-7 sm:flex-row sm:items-center">
                <Link href="/blog" className="btn-ghost">
                  <ArrowLeft className="h-4 w-4" strokeWidth={2} />
                  Back to all posts
                </Link>
                <Link href="/growth-audit" className="btn-secondary px-5 py-2.5">
                  Apply this to your business
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </Link>
              </div>

              <aside className="mt-8 rounded-xl border border-line bg-surface p-6" aria-label="About the author and editorial standard">
                <p className="font-display text-lg font-bold text-ink">About {post.author}</p>
                <p className="mt-2 font-sans text-sm leading-relaxed text-muted">
                  Vistrow&apos;s content team works across performance marketing, CRM, automation,
                  AI voice, and product delivery. Product capability claims are checked against
                  the relevant product workflow; external facts should be linked to their source
                  in the article. Articles are educational and are not a substitute for advice
                  based on your business, data, or jurisdiction.
                </p>
              </aside>
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
