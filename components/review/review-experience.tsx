"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { ArrowRight, Check, Copy, Loader2, RotateCcw } from "lucide-react";
import type { ReviewBusiness } from "@/lib/review-businesses";

export function ReviewExperience({ business }: { business: ReviewBusiness }) {
  const [service, setService] = useState("");
  const [experience, setExperience] = useState("");
  const [improvement, setImprovement] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function generate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading || !confirmed || experience.trim().length < 20) return;
    setLoading(true);
    setError("");
    setCopied(false);

    try {
      const response = await fetch("/api/review-draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: business.slug, service, experience, improvement }),
      });
      const result = (await response.json()) as { draft?: string; error?: string };
      if (!response.ok || !result.draft) throw new Error(result.error || "Could not create a draft.");
      setDraft(result.draft);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not create a draft.");
    } finally {
      setLoading(false);
    }
  }

  async function copyReview() {
    if (!draft.trim()) return;
    try {
      await navigator.clipboard.writeText(draft.trim());
      setCopied(true);
      setError("");
    } catch {
      setError("Copy was blocked. Select the draft above and copy it manually.");
    }
  }

  function continueToGoogle() {
    if (!draft.trim()) return;
    void copyReview();
    const opened = window.open(business.googleReviewUrl, "_blank", "noopener,noreferrer");
    if (!opened) window.location.assign(business.googleReviewUrl);
  }

  return (
    <div className="review-experience min-h-screen bg-white text-[#151719]">
      <div className="border-b border-[#e5e8eb]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <div className="flex min-w-0 items-center gap-4">
            <div className="relative h-11 w-36 shrink-0 sm:h-12 sm:w-40">
              <Image src={business.logoLight} alt={`${business.name} logo`} fill sizes="160px" className="object-contain object-left" priority />
            </div>
            <span className="hidden h-7 w-px bg-[#d9dee3] sm:block" />
            <span className="hidden text-sm font-medium text-[#59616a] sm:block">Customer review</span>
          </div>
          <span className="hidden whitespace-nowrap text-xs font-semibold uppercase tracking-[0.12em] text-[#59616a] sm:block">Your words. Your choice.</span>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-20 pt-12 sm:px-8 md:gap-16 md:pt-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div className="lg:pt-7">
          <div className="mb-7 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.13em] text-[#53610a]">
            <span className="h-2 w-2 bg-[#c6ff00]" />
            {business.name}
          </div>
          <h1 className="max-w-lg font-display text-4xl font-extrabold leading-[1.1] sm:text-5xl">
            Tell us how it <span className="underline decoration-[#c6ff00] decoration-[0.16em] underline-offset-[0.09em]">really went.</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-[#505862] sm:text-lg">
            Share a few details about working with {business.name}. We can help turn them into a clear review you can edit before posting.
          </p>

          <div className="mt-12 border-t border-[#dfe3e6] pt-6">
            <p className="text-sm font-semibold text-[#202429]">All feedback is welcome.</p>
            <p className="mt-2 max-w-md text-sm leading-6 text-[#626a73]">
              Good, mixed, or disappointing: your review should reflect your own experience. Nothing is posted automatically.
            </p>
          </div>
        </div>

        <div className="border border-[#dfe3e6] bg-[#f8f9f9] p-5 sm:p-8">
          {!draft ? (
            <form onSubmit={generate} className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#dfe3e6] pb-5">
                <h2 className="font-display text-xl font-bold">Your experience</h2>
                <span className="text-xs font-semibold text-[#79818b]">01 / 02</span>
              </div>

              <div>
                <label htmlFor="review-service" className="block text-sm font-semibold">What did {business.name} help with?</label>
                <input
                  id="review-service"
                  type="text"
                  maxLength={120}
                  value={service}
                  onChange={(event) => setService(event.target.value)}
                  placeholder="e.g. a website, ads, CRM, or support"
                  className="mt-2 w-full border border-[#cbd1d6] bg-white px-4 py-3 text-sm outline-none transition-colors placeholder:text-[#8c949b] focus:border-[#424a4f]"
                />
              </div>

              <div>
                <label htmlFor="review-experience" className="block text-sm font-semibold">What happened in your own words? <span className="text-[#68717a]">*</span></label>
                <textarea
                  id="review-experience"
                  required
                  minLength={20}
                  maxLength={900}
                  rows={5}
                  value={experience}
                  onChange={(event) => setExperience(event.target.value)}
                  placeholder="What stood out? What worked, or what didn't?"
                  className="mt-2 w-full resize-y border border-[#cbd1d6] bg-white px-4 py-3 text-sm leading-6 outline-none transition-colors placeholder:text-[#8c949b] focus:border-[#424a4f]"
                />
                <span className="mt-1 block text-right text-xs text-[#79818b]">{experience.length}/900</span>
              </div>

              <div>
                <label htmlFor="review-improvement" className="block text-sm font-semibold">Anything that could have been better? <span className="font-normal text-[#68717a]">Optional</span></label>
                <textarea
                  id="review-improvement"
                  maxLength={500}
                  rows={3}
                  value={improvement}
                  onChange={(event) => setImprovement(event.target.value)}
                  placeholder="It's fine to include criticism."
                  className="mt-2 w-full resize-y border border-[#cbd1d6] bg-white px-4 py-3 text-sm leading-6 outline-none transition-colors placeholder:text-[#8c949b] focus:border-[#424a4f]"
                />
              </div>

              <label className="flex cursor-pointer items-start gap-3 text-sm leading-5 text-[#4e5760]">
                <input type="checkbox" checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} className="mt-0.5 h-4 w-4 accent-[#252c20]" />
                <span>This is based on my own experience with {business.name}.</span>
              </label>

              {error && <p role="alert" className="border-l-2 border-[#b91c1c] pl-3 text-sm text-[#a11d1d]">{error}</p>}

              <button
                type="submit"
                disabled={loading || !confirmed || experience.trim().length < 20}
                className="flex min-h-12 w-full items-center justify-center gap-2 bg-[#c6ff00] px-5 py-3 text-sm font-bold text-[#0d0d0d] transition-colors hover:bg-[#b3e900] disabled:cursor-not-allowed disabled:opacity-45"
              >
                {loading ? <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" /> : <ArrowRight aria-hidden="true" className="h-4 w-4" />}
                {loading ? "Writing your draft..." : "Draft my review"}
              </button>
              <p className="text-xs leading-5 text-[#707982]">AI helps with wording only. Please check every detail before you post.</p>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#dfe3e6] pb-5">
                <h2 className="font-display text-xl font-bold">Review your draft</h2>
                <span className="text-xs font-semibold text-[#79818b]">02 / 02</span>
              </div>
              <p className="text-sm leading-6 text-[#58616a]">Edit anything that doesn&apos;t sound like you. Google will ask you to choose your own star rating.</p>
              <div>
                <label htmlFor="review-draft" className="block text-sm font-semibold">Your review</label>
                <textarea
                  id="review-draft"
                  value={draft}
                  maxLength={1200}
                  rows={8}
                  onChange={(event) => { setDraft(event.target.value); setCopied(false); }}
                  className="mt-2 w-full resize-y border border-[#aeb7be] bg-white px-4 py-4 text-base leading-7 outline-none transition-colors focus:border-[#424a4f]"
                />
              </div>

              {error && <p role="alert" className="border-l-2 border-[#b91c1c] pl-3 text-sm text-[#a11d1d]">{error}</p>}
              {copied && <p role="status" className="flex items-center gap-2 text-sm font-medium text-[#3f5a18]"><Check aria-hidden="true" className="h-4 w-4" /> Copied. Paste it into Google&apos;s review box.</p>}

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={continueToGoogle}
                  disabled={!draft.trim()}
                  className="flex min-h-12 flex-1 items-center justify-center gap-2 bg-[#c6ff00] px-5 py-3 text-sm font-bold text-[#0d0d0d] transition-colors hover:bg-[#b3e900] disabled:cursor-not-allowed disabled:opacity-45"
                >
                  Copy &amp; open Google <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={copyReview}
                  disabled={!draft.trim()}
                  className="flex min-h-12 items-center justify-center gap-2 border border-[#b9c1c7] bg-white px-5 py-3 text-sm font-semibold transition-colors hover:bg-[#eff1f2] disabled:opacity-45"
                >
                  <Copy aria-hidden="true" className="h-4 w-4" /> Copy only
                </button>
              </div>
              <button type="button" onClick={() => { setDraft(""); setCopied(false); setError(""); }} className="flex items-center gap-2 text-sm font-medium text-[#616a73] underline-offset-4 hover:underline">
                <RotateCcw aria-hidden="true" className="h-4 w-4" /> Change my answers
              </button>
              <p className="border-t border-[#dfe3e6] pt-5 text-xs leading-5 text-[#707982]">You post the review yourself on Google. This page cannot publish it for you.</p>
            </div>
          )}
        </div>
      </div>

      <footer className="border-t border-[#e5e8eb] px-5 py-5 text-center text-xs text-[#747d85]">
        Review assistance by Vistrow. Your words remain yours.
      </footer>
    </div>
  );
}
