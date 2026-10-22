"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  ChartNoAxesCombined,
  Database,
  Lightbulb,
  Megaphone,
  Search,
  Sparkles,
  Target,
  Workflow,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { BlogPost } from "@/lib/content-types";
import { FEATURED_COUNT, POSTS_PER_PAGE, blogPageCount } from "@/lib/blog-paging";

const ALL_TOPICS = "All insights";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function CategoryIcon({ category, className = "h-5 w-5" }: { category: string; className?: string }) {
  if (category === "AI Voice") return <Bot className={className} strokeWidth={1.8} />;
  if (category === "Business Automation") return <Workflow className={className} strokeWidth={1.8} />;
  if (category === "Conversion Tracking") return <ChartNoAxesCombined className={className} strokeWidth={1.8} />;
  if (category === "CRM & Automation") return <Database className={className} strokeWidth={1.8} />;
  if (category === "Digital Marketing") return <Megaphone className={className} strokeWidth={1.8} />;
  if (category === "Lead Generation") return <Target className={className} strokeWidth={1.8} />;
  return <Lightbulb className={className} strokeWidth={1.8} />;
}

export function BlogHub({ posts, page = 1 }: { posts: BlogPost[]; page?: number }) {
  const sortedPosts = useMemo(
    () => [...posts].sort((a, b) => (a.date < b.date ? 1 : -1)),
    [posts],
  );
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(ALL_TOPICS);
  const [filterPage, setFilterPage] = useState(1);
  const searchRef = useRef<HTMLInputElement>(null);

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    sortedPosts.forEach((post) => {
      counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
    });
    return [...counts.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [sortedPosts]);

  const filteredPosts = useMemo(() => {
    const term = query.trim().toLowerCase();
    return sortedPosts.filter((post) => {
      const matchesCategory = activeCategory === ALL_TOPICS || post.category === activeCategory;
      const haystack = [
        post.title,
        post.excerpt,
        post.category,
        post.author,
        post.focusKeyword,
        ...(post.secondaryKeywords || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return matchesCategory && (!term || haystack.includes(term));
    });
  }, [activeCategory, query, sortedPosts]);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  const hasFilters = query.trim().length > 0 || activeCategory !== ALL_TOPICS;
  useEffect(() => setFilterPage(1), [query, activeCategory]);

  const [featuredPost, ...alsoNew] = sortedPosts.slice(0, FEATURED_COUNT);
  const totalPages = blogPageCount(sortedPosts.length);
  const filteredPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const gridPosts = hasFilters
    ? filteredPosts.slice((filterPage - 1) * POSTS_PER_PAGE, filterPage * POSTS_PER_PAGE)
    : sortedPosts.slice(FEATURED_COUNT + (page - 1) * POSTS_PER_PAGE, FEATURED_COUNT + page * POSTS_PER_PAGE);
  const showFeatured = !hasFilters && page === 1 && featuredPost;

  const selectCategory = (category: string) => {
    setActiveCategory(category);
    window.requestAnimationFrame(() => {
      document.getElementById("article-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const resetFilters = () => {
    setQuery("");
    setActiveCategory(ALL_TOPICS);
    searchRef.current?.focus();
  };

  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-bg">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70 [background-image:linear-gradient(rgb(var(--line)/0.35)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--line)/0.35)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-10 h-[420px] w-[420px] rounded-full bg-accent/10 blur-[100px]"
        />

        <div className="container-edge relative py-8 sm:py-16 lg:py-20">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-sans text-sm text-muted">
            <Link href="/" className="transition-colors hover:text-ink">Home</Link>
            <span aria-hidden className="text-line">/</span>
            <span className="text-ink">Blog</span>
          </nav>

          <div className="mt-6 grid items-end gap-6 sm:mt-10 sm:gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.7fr)] lg:gap-16">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-ink shadow-[0_0_28px_rgb(var(--accent)/0.28)]">
                  <Sparkles className="h-4 w-4" />
                </span>
                <p className="eyebrow">Vistrow Intelligence</p>
              </div>
              <h1 className="mt-4 max-w-4xl font-display text-hero-lg text-ink sm:mt-6">
                Practical ideas for <span className="text-accent-strong">measurable growth.</span>
              </h1>
              <p className="mt-4 max-w-2xl font-sans text-base leading-relaxed text-muted sm:mt-6 sm:text-xl">
                Clear thinking on marketing, CRM, AI voice and automation for teams building a connected revenue system.
              </p>
            </div>

            <div className="glass rounded-xl p-4 sm:p-6">
              <label htmlFor="blog-search" className="hidden font-display text-base font-bold text-ink sm:block">
                What do you want to solve?
              </label>
              <div className="flex h-12 items-center gap-3 sm:mt-3 sm:h-14 rounded-lg border border-line bg-bg/80 px-4 transition-colors focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/10">
                <Search className="h-5 w-5 shrink-0 text-muted" strokeWidth={1.8} />
                <input
                  ref={searchRef}
                  id="blog-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search ideas, systems, tactics..."
                  className="min-w-0 flex-1 bg-transparent font-sans text-sm text-ink outline-none placeholder:text-muted"
                />
                {query ? (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-ink"
                  >
                    <X className="h-4 w-4" />
                  </button>
                ) : (
                  <kbd className="hidden rounded border border-line bg-surface px-2 py-1 font-sans text-[10px] font-semibold text-muted sm:inline-block">
                    ⌘ K
                  </kbd>
                )}
              </div>
              <div className="mt-5 hidden grid-cols-2 gap-4 border-t border-line pt-5 sm:grid">
                <div>
                  <p className="font-display text-2xl font-extrabold text-ink">{posts.length}</p>
                  <p className="mt-0.5 font-sans text-xs text-muted">Field notes</p>
                </div>
                <div className="border-l border-line pl-4">
                  <p className="font-display text-2xl font-extrabold text-ink">{categories.length}</p>
                  <p className="mt-0.5 font-sans text-xs text-muted">Core topics</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TopicStrip>
        <TopicButton active={activeCategory === ALL_TOPICS} label={ALL_TOPICS} count={posts.length} onClick={() => selectCategory(ALL_TOPICS)} />
        {categories.map(([category, count]) => (
          <TopicButton key={category} active={activeCategory === category} label={category} count={count} onClick={() => selectCategory(category)} />
        ))}
      </TopicStrip>

      {showFeatured && (
        <section className="py-10 sm:py-16 lg:py-20">
          <div className="container-edge">
            <div className="mb-7 flex items-end justify-between gap-4 sm:mb-9">
              <div>
                <p className="eyebrow">Featured</p>
                <h2 className="mt-3 font-display text-h2 text-ink">New this week</h2>
              </div>
              <span className="hidden font-sans text-sm text-muted sm:block">A new researched guide every day</span>
            </div>

            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group grid overflow-hidden rounded-2xl border border-line bg-card shadow-soft transition-shadow duration-300 hover:shadow-lift lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]"
            >
              <div className="p-3 sm:p-4 lg:pr-0">
                <CoverImage post={featuredPost} priority sizes="(min-width: 1024px) 50vw, 100vw" className="rounded-xl" />
              </div>
              <div className="flex flex-col justify-center px-5 pb-6 pt-2 sm:px-8 sm:pb-8 lg:p-10">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="rounded-full bg-accent px-2.5 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-accent-ink">Latest</span>
                  <span className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-ink">
                    <CategoryIcon category={featuredPost.category} className="h-3.5 w-3.5 text-accent-strong" />
                    {featuredPost.category}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-h3 text-ink transition-colors group-hover:text-accent-strong">{featuredPost.title}</h3>
                <p className="mt-3 line-clamp-3 font-sans text-base leading-relaxed text-muted">{featuredPost.excerpt}</p>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
                  <span className="font-sans text-xs text-muted">
                    <time dateTime={featuredPost.date}>{formatDate(featuredPost.date)}</time> · {featuredPost.readTime}
                  </span>
                  <span className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-ink">
                    Read the guide <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>

            {alsoNew.length > 0 && (
              <div className="mt-10 sm:mt-14">
                <p className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Also recent</p>
                <div className="mt-2 grid grid-cols-1 gap-x-7 divide-y divide-line sm:mt-5 sm:gap-y-12 sm:divide-y-0 md:grid-cols-2 xl:grid-cols-3">
                  {alsoNew.map((post) => (
                    <ArticleCard key={post.slug} post={post} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      <section id="article-results" className="scroll-mt-36 border-t border-line bg-surface/55 py-10 sm:py-16 lg:py-20">
        <div className="container-edge">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">{hasFilters ? "Filtered library" : page > 1 ? `Page ${page} of ${totalPages}` : "All guides"}</p>
              <h2 className="mt-3 font-display text-h2 text-ink">
                {hasFilters ? "Ideas matched to your search" : page > 1 ? "More guides" : "Keep exploring"}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <p aria-live="polite" className="font-sans text-sm text-muted">
                {hasFilters ? filteredPosts.length : sortedPosts.length} {(hasFilters ? filteredPosts.length : sortedPosts.length) === 1 ? "article" : "articles"}
              </p>
              {hasFilters && (
                <button type="button" onClick={resetFilters} className="btn-ghost px-3 py-2 text-xs">
                  Clear filters <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {gridPosts.length > 0 ? (
            <div className="mt-7 grid grid-cols-1 gap-x-7 divide-y divide-line sm:mt-9 sm:gap-y-12 sm:divide-y-0 md:grid-cols-2 xl:grid-cols-3">
              {gridPosts.map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
          ) : null}

          {gridPosts.length > 0 ? (
            hasFilters ? (
              filteredPages > 1 && (
                <Pagination
                  current={filterPage}
                  total={filteredPages}
                  renderItem={(n, label, active) => (
                    <button
                      type="button"
                      onClick={() => {
                        setFilterPage(n);
                        document.getElementById("article-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                      aria-current={active ? "page" : undefined}
                      className={pageItemClass(active)}
                    >
                      {label}
                    </button>
                  )}
                />
              )
            ) : (
              totalPages > 1 && (
                <Pagination
                  current={page}
                  total={totalPages}
                  renderItem={(n, label, active) => (
                    <Link href={n === 1 ? "/blog" : `/blog/page/${n}`} aria-current={active ? "page" : undefined} className={pageItemClass(active)}>
                      {label}
                    </Link>
                  )}
                />
              )
            )
          ) : (
            <div className="mt-9 rounded-2xl border border-dashed border-line bg-bg px-6 py-16 text-center sm:py-20">
              <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-accent-strong">
                <Search className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-2xl font-bold text-ink">No exact match yet</h3>
              <p className="mx-auto mt-2 max-w-md font-sans text-sm leading-relaxed text-muted">
                Try a broader phrase or clear the topic filter to explore the complete Vistrow library.
              </p>
              <button type="button" onClick={resetFilters} className="btn-primary mt-6">
                View all insights <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

// Topic pills: start aligned with the page content and scroll out to the screen edge (no hard cut),
// with a fade and arrow buttons while more topics are off-screen.
function TopicStrip({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: true });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setEdges({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  const scrollBy = (dx: number) => ref.current?.scrollBy({ left: dx, behavior: "smooth" });
  const mask = !edges.end ? "[mask-image:linear-gradient(to_right,black_85%,transparent)]" : "";
  return (
    <div className="sticky top-[72px] z-30 border-b border-line bg-bg/90 backdrop-blur-xl">
      <div className="relative">
        <div
          ref={ref}
          className={`flex items-center gap-2 overflow-x-auto py-3 pl-5 pr-16 [scrollbar-width:none] sm:pl-8 lg:pl-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))] [&::-webkit-scrollbar]:hidden ${mask}`}
        >
          {children}
        </div>
        {!edges.start && (
          <button type="button" aria-label="Scroll topics left" onClick={() => scrollBy(-320)} className="absolute left-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-card text-ink shadow-soft lg:inline-flex">
            <ArrowLeft className="h-4 w-4" />
          </button>
        )}
        {!edges.end && (
          <button type="button" aria-label="More topics" onClick={() => scrollBy(320)} className="absolute right-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-card text-ink shadow-soft">
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

function TopicButton({
  active,
  label,
  count,
  onClick,
}: {
  active: boolean;
  label: string;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 font-sans text-xs font-semibold transition-all ${
        active
          ? "border-accent bg-accent text-accent-ink shadow-[0_8px_24px_rgb(var(--accent)/0.16)]"
          : "border-line bg-bg text-muted hover:border-accent/60 hover:text-ink"
      }`}
    >
      {label}
      <span className={`rounded-full px-1.5 py-0.5 text-[10px] ${active ? "bg-accent-ink/10" : "bg-surface"}`}>
        {count}
      </span>
    </button>
  );
}

// Covers are designed at 16:9, so they are always shown in a 16:9 frame (never cropped).
function CoverImage({
  post,
  sizes,
  priority = false,
  className = "",
}: {
  post: BlogPost;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative aspect-[16/9] overflow-hidden border border-line bg-surface ${className}`}>
      {post.featuredImage?.url ? (
        <Image
          src={post.featuredImage.url}
          alt={post.featuredImage.alt || post.title}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.03]"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-inverse text-accent">
          <CategoryIcon category={post.category} className="h-14 w-14" />
        </div>
      )}
    </div>
  );
}

function pageItemClass(active: boolean) {
  return `inline-flex h-11 min-w-11 items-center justify-center rounded-full border px-4 font-sans text-sm font-semibold transition-colors ${
    active ? "border-accent bg-accent text-accent-ink" : "border-line bg-bg text-ink hover:border-accent/60"
  }`;
}

// Numbered pagination: 1 2 3 ... with previous / next. renderItem decides link (crawlable pages) or button (filtered results).
function Pagination({
  current,
  total,
  renderItem,
}: {
  current: number;
  total: number;
  renderItem: (page: number, label: React.ReactNode, active: boolean) => React.ReactNode;
}) {
  const pages = Array.from({ length: total }, (_, i) => i + 1).filter((n) => n === 1 || n === total || Math.abs(n - current) <= 1);
  const items: (number | "gap")[] = [];
  pages.forEach((n, i) => {
    if (i > 0 && n - pages[i - 1] > 1) items.push("gap");
    items.push(n);
  });
  return (
    <nav aria-label="Blog pages" className="mt-12 flex flex-wrap items-center justify-center gap-2">
      {current > 1 && renderItem(current - 1, <><ArrowLeft className="h-4 w-4" /> Previous</>, false)}
      {items.map((item, i) =>
        item === "gap" ? (
          <span key={`gap-${i}`} className="px-1 font-sans text-sm text-muted">…</span>
        ) : (
          <span key={item}>{renderItem(item, item, item === current)}</span>
        ),
      )}
      {current < total && renderItem(current + 1, <>Next <ArrowRight className="h-4 w-4" /></>, false)}
    </nav>
  );
}

function ArticleCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group grid grid-cols-[132px_minmax(0,1fr)] items-center gap-4 py-5 sm:flex sm:flex-col sm:items-stretch sm:gap-0 sm:py-0">
      <CoverImage post={post} sizes="(min-width: 1280px) 30vw, (min-width: 768px) 46vw, (min-width: 640px) 100vw, 132px" className="rounded-lg transition-shadow duration-300 group-hover:shadow-lift sm:rounded-xl" />
      <div className="min-w-0 sm:mt-5">
        <div className="flex items-center justify-between gap-3">
          <span className="font-sans text-[10px] font-bold uppercase tracking-[0.15em] text-accent-strong">{post.category}</span>
          <span className="hidden font-sans text-xs text-muted sm:inline">{post.readTime}</span>
        </div>
        <h3 className="mt-1.5 line-clamp-3 font-display text-[15px] font-bold leading-snug tracking-[-0.01em] text-ink transition-colors group-hover:text-accent-strong sm:mt-2.5 sm:line-clamp-none sm:text-xl sm:leading-[1.22] sm:tracking-[-0.02em]">
          {post.title}
        </h3>
        <div className="hidden sm:block"><p className="mt-2.5 line-clamp-2 font-sans text-sm leading-relaxed text-muted">{post.excerpt}</p></div>
        <time className="mt-1.5 block font-sans text-xs text-muted sm:mt-3" dateTime={post.date}>{formatDate(post.date)}</time>
      </div>
    </Link>
  );
}
