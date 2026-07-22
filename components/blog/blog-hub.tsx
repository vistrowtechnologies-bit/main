"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  ChartNoAxesCombined,
  Database,
  Lightbulb,
  Search,
  Sparkles,
  Target,
  Workflow,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { BlogPost } from "@/lib/content-types";

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
  if (category === "Lead Generation") return <Target className={className} strokeWidth={1.8} />;
  return <Lightbulb className={className} strokeWidth={1.8} />;
}

export function BlogHub({ posts }: { posts: BlogPost[] }) {
  const sortedPosts = useMemo(
    () => [...posts].sort((a, b) => (a.date < b.date ? 1 : -1)),
    [posts],
  );
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(ALL_TOPICS);
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
  const featuredPost = sortedPosts[0];
  const gridPosts = hasFilters ? filteredPosts : sortedPosts.slice(1);

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

        <div className="container-edge relative py-14 sm:py-16 lg:py-20">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-sans text-sm text-muted">
            <Link href="/" className="transition-colors hover:text-ink">Home</Link>
            <span aria-hidden className="text-line">/</span>
            <span className="text-ink">Blog</span>
          </nav>

          <div className="mt-10 grid items-end gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.7fr)] lg:gap-16">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-ink shadow-[0_0_28px_rgb(var(--accent)/0.28)]">
                  <Sparkles className="h-4 w-4" />
                </span>
                <p className="eyebrow">Vistrow Intelligence</p>
              </div>
              <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.7rem,6vw,5.5rem)] font-extrabold leading-[0.98] tracking-[-0.055em] text-ink">
                Practical ideas for <span className="text-accent-strong">measurable growth.</span>
              </h1>
              <p className="mt-6 max-w-2xl font-sans text-lg leading-relaxed text-muted sm:text-xl">
                Clear thinking on marketing, CRM, AI voice and automation for teams building a connected revenue system.
              </p>
            </div>

            <div className="glass rounded-xl p-5 sm:p-6">
              <label htmlFor="blog-search" className="font-display text-base font-bold text-ink">
                What do you want to solve?
              </label>
              <div className="mt-3 flex h-14 items-center gap-3 rounded-lg border border-line bg-bg/80 px-4 transition-colors focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/10">
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
              <div className="mt-5 grid grid-cols-2 gap-4 border-t border-line pt-5">
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

      <div className="sticky top-[72px] z-30 border-b border-line bg-bg/90 backdrop-blur-xl">
        <div className="container-edge flex items-center gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <span className="mr-2 hidden shrink-0 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-muted lg:inline">
            Browse
          </span>
          <TopicButton
            active={activeCategory === ALL_TOPICS}
            label={ALL_TOPICS}
            count={posts.length}
            onClick={() => selectCategory(ALL_TOPICS)}
          />
          {categories.map(([category, count]) => (
            <TopicButton
              key={category}
              active={activeCategory === category}
              label={category}
              count={count}
              onClick={() => selectCategory(category)}
            />
          ))}
        </div>
      </div>

      {!hasFilters && featuredPost && (
        <section className="py-14 sm:py-16 lg:py-20">
          <div className="container-edge">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Featured insight</p>
                <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  Start with the latest
                </h2>
              </div>
              <span className="hidden font-sans text-sm text-muted sm:block">Selected by the Vistrow team</span>
            </div>

            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group grid overflow-hidden rounded-2xl bg-inverse shadow-lift transition-transform duration-300 ease-premium hover:-translate-y-1 lg:grid-cols-[1.15fr_0.85fr]"
            >
              <div className="flex min-h-[400px] flex-col p-7 sm:p-10 lg:p-12">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-inverse-ink/15 bg-inverse-ink/5 px-3 py-1.5 font-sans text-xs font-semibold text-inverse-ink">
                    <CategoryIcon category={featuredPost.category} className="h-3.5 w-3.5 text-accent-strong" />
                    {featuredPost.category}
                  </span>
                  <span className="font-sans text-xs text-inverse-ink-2">{featuredPost.readTime}</span>
                </div>
                <h3 className="mt-8 max-w-3xl font-display text-[clamp(2rem,4vw,3.75rem)] font-extrabold leading-[1.02] tracking-[-0.045em] text-inverse-ink">
                  {featuredPost.title}
                </h3>
                <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-inverse-ink-2 sm:text-lg">
                  {featuredPost.excerpt}
                </p>
                <div className="mt-auto flex flex-wrap items-end justify-between gap-6 pt-10">
                  <div className="font-sans text-xs text-inverse-ink-2">
                    <p className="font-semibold text-inverse-ink">{featuredPost.author}</p>
                    <time className="mt-1 block" dateTime={featuredPost.date}>{formatDate(featuredPost.date)}</time>
                  </div>
                  <span className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-inverse-ink">
                    Read the insight
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>

              <div className="relative min-h-[320px] overflow-hidden border-t border-inverse-ink/10 bg-accent lg:min-h-full lg:border-l lg:border-t-0">
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgb(var(--accent-ink)/0.35)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--accent-ink)/0.35)_1px,transparent_1px)] [background-size:44px_44px]"
                />
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[42px] border-accent-ink/10" />
                <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full border-[1px] border-accent-ink/25" />
                <div className="relative flex h-full min-h-[320px] flex-col justify-between p-8 text-accent-ink sm:p-10">
                  <div className="flex items-start justify-between">
                    <span className="font-sans text-xs font-bold uppercase tracking-[0.2em]">Vistrow / Journal</span>
                    <ArrowUpRight className="h-8 w-8 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" strokeWidth={1.5} />
                  </div>
                  <CategoryIcon category={featuredPost.category} className="h-28 w-28 sm:h-36 sm:w-36" />
                  <div className="flex items-end justify-between border-t border-accent-ink/25 pt-5">
                    <span className="font-display text-5xl font-extrabold tracking-[-0.06em]">01</span>
                    <span className="max-w-[140px] text-right font-sans text-xs font-semibold leading-relaxed">Ideas that connect activity to revenue</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      <section id="article-results" className="scroll-mt-36 border-t border-line bg-surface/55 py-14 sm:py-16 lg:py-20">
        <div className="container-edge">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">{hasFilters ? "Filtered library" : "Latest intelligence"}</p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-[-0.035em] text-ink sm:text-4xl">
                {hasFilters ? "Ideas matched to your search" : "Keep exploring"}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <p aria-live="polite" className="font-sans text-sm text-muted">
                {gridPosts.length} {gridPosts.length === 1 ? "article" : "articles"}
              </p>
              {hasFilters && (
                <button type="button" onClick={resetFilters} className="btn-ghost px-3 py-2 text-xs">
                  Clear filters <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {gridPosts.length > 0 ? (
            <div className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {gridPosts.map((post, index) => (
                <ArticleCard key={post.slug} post={post} index={index + (hasFilters ? 1 : 2)} />
              ))}
            </div>
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

function ArticleCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex min-h-[420px] flex-col overflow-hidden rounded-xl border border-line bg-card transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-accent/60 hover:shadow-lift"
    >
      <div className="relative min-h-[150px] overflow-hidden border-b border-line bg-bg p-5">
        <div
          aria-hidden
          className="absolute inset-0 opacity-60 [background-image:radial-gradient(rgb(var(--muted)/0.24)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:linear-gradient(to_bottom_right,black,transparent)]"
        />
        <div className="relative flex h-full min-h-[110px] items-start justify-between">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-card text-accent-strong shadow-soft transition-transform duration-300 group-hover:rotate-[-4deg] group-hover:scale-105">
            <CategoryIcon category={post.category} />
          </span>
          <span className="font-display text-5xl font-extrabold tracking-[-0.07em] text-line">
            {String(index).padStart(2, "0")}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="font-sans text-[10px] font-bold uppercase tracking-[0.15em] text-accent-strong">
            {post.category}
          </span>
          <span className="font-sans text-xs text-muted">{post.readTime}</span>
        </div>
        <h3 className="mt-4 font-display text-xl font-bold leading-[1.22] tracking-[-0.02em] text-ink transition-colors group-hover:text-accent-strong">
          {post.title}
        </h3>
        <p className="mt-3 line-clamp-3 font-sans text-sm leading-relaxed text-muted">{post.excerpt}</p>
        <div className="mt-auto flex items-end justify-between gap-4 border-t border-line pt-5">
          <div className="font-sans text-[11px] text-muted">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden className="mx-1.5">·</span>
            <span>{post.author}</span>
          </div>
          <ArrowUpRight className="h-5 w-5 shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-strong" />
        </div>
      </div>
    </Link>
  );
}
