"use client";

import { useEffect, useState } from "react";
import { SpamGuard, readSpamGuard } from "@/components/forms/spam-guard";

type Comment = { _id: string; name: string; comment: string; createdAt: string };

export function BlogComments({ slug }: { slug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/blog-comments?slug=${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then((d) => setComments(d.comments || []))
      .catch(() => {});
  }, [slug]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/blog-comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          name: data.get("name"),
          email: data.get("email"),
          comment: data.get("comment"),
          ...readSpamGuard(form),
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "Could not post your comment.");
      form.reset();
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not post your comment.");
      setStatus("error");
    }
  }

  const field =
    "w-full rounded-xl border border-line bg-surface px-4 py-3 font-sans text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none";

  return (
    <section id="comments" className="mt-12 border-t border-line pt-10" aria-labelledby="comments-heading">
      <h2 id="comments-heading" className="font-display text-h3 text-ink">
        Comments{comments.length > 0 ? ` (${comments.length})` : ""}
      </h2>

      {comments.length > 0 && (
        <ul className="mt-6 space-y-5">
          {comments.map((c) => (
            <li key={c._id} className="rounded-xl border border-line bg-surface p-5">
              <p className="font-sans text-sm font-semibold text-ink">
                {c.name}
                <span className="ml-2 font-normal text-muted">
                  {new Date(c.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                </span>
              </p>
              <p className="mt-2 whitespace-pre-line font-sans text-sm leading-relaxed text-muted">{c.comment}</p>
            </li>
          ))}
        </ul>
      )}

      {status === "sent" ? (
        <p className="mt-6 rounded-xl border border-accent/40 bg-accent/10 p-5 font-sans text-sm text-ink">
          Thanks. Your comment is waiting for approval and will appear once we have read it.
        </p>
      ) : (
        <form onSubmit={submit} className="relative mt-6 grid gap-4" noValidate>
          <SpamGuard />
          <div className="grid gap-4 sm:grid-cols-2">
            <input name="name" required maxLength={80} placeholder="Your name" aria-label="Your name" className={field} />
            <input name="email" type="email" maxLength={160} placeholder="Email (optional, never shown)" aria-label="Email" className={field} />
          </div>
          <textarea name="comment" required minLength={3} maxLength={2000} rows={4} placeholder="Add a comment" aria-label="Comment" className={field} />
          {status === "error" && <p className="font-sans text-sm text-red-500">{error}</p>}
          <div>
            <button type="submit" disabled={status === "sending"} className="btn-primary px-6 py-2.5 disabled:opacity-60">
              {status === "sending" ? "Posting..." : "Post comment"}
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
