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
      .slice(0, 4);
  }, [category, currentCategory, currentSlug, posts, query]);

  const content = (
    <div className="space-y-6">
      <div>
        <p className="font-sans text-xs font-semibold text-ink">
          Search the blog
        </p>
        <div className="mt-2 flex items-center gap-2 rounded-sm border border-line bg-bg px-3 py-2.5 focus-within:border-accent">
          <Search className="h-4 w-4 shrink-0 text-muted" strokeWidth={1.8} />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search topics..."
            aria-label="Search blog topics"
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
      </div>

      <div>
        <p className="font-sans text-xs font-semibold text-ink">Browse categories</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <CategoryButton
            label="All"
            count={posts.length}
            active={category === "All"}
            onClick={() => setCategory("All")}
          />
          {categories.map(([label, count]) => (
            <CategoryButton
              key={label}
              label={label}
              count={count}
              active={category === label}
              onClick={() => setCategory(label)}
            />
          ))}
        </div>
      </div>

      {headings.length > 0 && !query && category === "All" && (
        <div className="border-t border-line pt-5">
          <p className="font-sans text-xs font-semibold text-ink">In this article</p>
          <ol className="mt-3 space-y-2.5">
            {headings.map((heading, index) => (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  className="group flex items-start gap-2 font-sans text-[13px] leading-snug text-muted transition-colors hover:text-ink"
                >
                  <span className="font-semibold text-accent-strong">{String(index + 1).padStart(2, "0")}</span>
                  <span>{heading.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className="border-t border-line pt-5">
        <div className="flex items-center justify-between gap-3">
          <p className="font-sans text-xs font-semibold text-ink">
            {query || category !== "All" ? "Matching articles" : "Suggested reading"}
          </p>
          {(query || category !== "All") && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
              className="font-sans text-[11px] font-semibold text-accent-strong hover:underline"
            >
              Reset
            </button>
          )}
        </div>
        {results.length > 0 ? (
          <ul className="mt-3 space-y-2">
            {results.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block rounded-sm border border-line/70 bg-bg/70 p-3 transition-all hover:border-accent hover:bg-card"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.1em] text-accent-strong">
                      {post.category}
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                  <p className="mt-1.5 font-display text-[13px] font-bold leading-snug text-ink">
                    {post.title}
                  </p>
                  <p className="mt-2 font-sans text-[11px] text-muted">
                    {post.readTime}{post.slug === currentSlug ? " · Current article" : ""}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-3 rounded-sm border border-dashed border-line p-4 text-center">
            <p className="font-sans text-xs text-muted">No articles match this search yet.</p>
          </div>
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

function CategoryButton({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 font-sans text-[11px] font-semibold transition-colors ${
        active
          ? "border-accent bg-accent text-accent-ink"
          : "border-line bg-bg text-muted hover:border-accent hover:text-ink"
      }`}
    >
      {label}
      <span className={active ? "text-accent-ink/65" : "text-muted/70"}>{count}</span>
    </button>
  );
}
