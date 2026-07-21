"use client";

import Link from "next/link";
import { ArrowUpRight, ChevronDown, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { BlogPost } from "@/lib/content-types";

type ExplorerPost = Pick<
  BlogPost,
  "slug" | "title" | "excerpt" | "category" | "date" | "readTime"
>;

type HeadingLink = { id: string; label: string };

export function BlogExplorer({
  posts,
  currentSlug,
  currentCategory,
  headings,
}: {
  posts: ExplorerPost[];
  currentSlug: string;
  currentCategory: string;
  headings: HeadingLink[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    posts.forEach((post) => counts.set(post.category, (counts.get(post.category) ?? 0) + 1));
    return [...counts.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [posts]);

  const isBrowsing = query.trim().length > 0 || category !== "All";
  const results = useMemo(() => {
    const normalisedQuery = query.trim().toLowerCase();
    const browsing = normalisedQuery.length > 0 || category !== "All";
    const filtered = posts.filter((post) => {
      if (!browsing && post.slug === currentSlug) return false;
      const matchesCategory = category === "All" || post.category === category;
      const searchable = `${post.title} ${post.excerpt} ${post.category}`.toLowerCase();
      return matchesCategory && (!normalisedQuery || searchable.includes(normalisedQuery));
    });

    return filtered
      .sort((a, b) => {
        if (!browsing) {
          const aRelated = a.category === currentCategory ? 1 : 0;
          const bRelated = b.category === currentCategory ? 1 : 0;
          if (aRelated !== bRelated) return bRelated - aRelated;
        }
        return a.date < b.date ? 1 : -1;
      })
      .slice(0, 3);
  }, [category, currentCategory, currentSlug, posts, query]);

  const resetFilters = () => {
    setQuery("");
    setCategory("All");
  };

  const content = (
    <div>
      <p className="eyebrow">Explore the blog</p>
      <div className="mt-4 flex items-center gap-2 rounded-sm border border-line bg-bg/80 px-3 py-2.5 focus-within:border-accent">
        <Search className="h-4 w-4 shrink-0 text-muted" strokeWidth={1.8} />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search articles..."
          aria-label="Search blog articles"
          className="min-w-0 flex-1 bg-transparent font-sans text-sm text-ink outline-none placeholder:text-muted"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear blog search"
            className="inline-flex h-6 w-6 items-center justify-center rounded-full text-muted hover:bg-surface hover:text-ink"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <p className="mt-4 font-sans text-xs font-semibold text-ink">Category</p>
      <div className="relative mt-2">
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          aria-label="Filter blog articles by category"
          className="w-full appearance-none rounded-sm border border-line bg-bg/80 px-3 py-2.5 pr-9 font-sans text-sm text-ink outline-none transition-colors focus:border-accent"
        >
          <option value="All">All categories ({posts.length})</option>
          {categories.map(([label, count]) => (
            <option key={label} value={label}>
              {label} ({count})
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
      </div>

      {!isBrowsing && headings.length > 0 && (
        <nav className="mt-6 border-t border-line pt-5" aria-label="Article sections">
          <p className="font-sans text-xs font-semibold text-ink">In this article</p>
          <ol className="mt-3 space-y-2.5">
            {headings.map((heading, index) => (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  className="group flex items-start gap-2.5 font-sans text-[13px] leading-snug text-muted transition-colors hover:text-ink"
                >
                  <span className="font-semibold text-accent-strong">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{heading.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      <div className="mt-6 border-t border-line pt-5">
        <div className="flex items-center justify-between gap-3">
          <p className="font-sans text-xs font-semibold text-ink">
            {isBrowsing ? "Matching articles" : "Suggested reading"}
          </p>
          {isBrowsing && (
            <button
              type="button"
              onClick={resetFilters}
              className="font-sans text-[11px] font-semibold text-accent-strong hover:underline"
            >
              Reset
            </button>
          )}
        </div>

        {results.length > 0 ? (
          <ul className="mt-3 divide-y divide-line">
            {results.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex items-start justify-between gap-3 py-3 first:pt-0"
                >
                  <div className="min-w-0">
                    <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.1em] text-accent-strong">
                      {post.category}
                    </span>
                    <p className="mt-1 line-clamp-2 font-display text-[13px] font-bold leading-snug text-ink transition-colors group-hover:text-accent-strong">
                      {post.title}
                    </p>
                    <p className="mt-1.5 font-sans text-[11px] text-muted">{post.readTime}</p>
                  </div>
                  <ArrowUpRight className="mt-1 h-3.5 w-3.5 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 font-sans text-xs leading-relaxed text-muted">
            No articles match this search yet.
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div id="blog-explorer">
      <details className="group rounded-lg border border-line bg-card/80 p-4 shadow-soft lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-sans text-sm font-semibold text-ink">
          Search and explore the blog
          <ChevronDown className="h-4 w-4 text-muted transition-transform group-open:rotate-180" />
        </summary>
        <div className="mt-5 border-t border-line pt-5">{content}</div>
      </details>
      <div className="glass hidden rounded-lg p-5 lg:block">{content}</div>
    </div>
  );
}
