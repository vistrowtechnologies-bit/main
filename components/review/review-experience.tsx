"use client";

import { FormEvent, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Check, Copy, Loader2, RotateCcw, Star } from "lucide-react";
import type { ReviewBusiness } from "@/lib/review-businesses";

const services = [
  "Digital marketing & ads", "Website or landing page", "CRM & lead management",
  "AI voice calling", "Automation", "Analytics & reporting", "Other",
];

export function ReviewExperience({ business }: { business: ReviewBusiness }) {
  const [rating, setRating] = useState(0);
  const [service, setService] = useState("");
  const [experience, setExperience] = useState("");
  const [improvement, setImprovement] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const draftRef = useRef<HTMLDivElement>(null);

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
        body: JSON.stringify({ slug: business.slug, service, experience, improvement, rating }),
      });
      const result = (await response.json()) as { draft?: string; error?: string };
      if (!response.ok || !result.draft) throw new Error(result.error || "Could not create a draft.");
      setDraft(result.draft);
      requestAnimationFrame(() => draftRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not create a draft.");
    } finally {
      setLoading(false);
    }
  }

  async function copyReview() {
    if (!draft.trim()) return false;
    try {
      await navigator.clipboard.writeText(draft.trim());
      setCopied(true);
      setError("");
      return true;
    } catch {
      setError("Copy was blocked. Select the draft above and copy it manually.");
      return false;
    }
  }

  async function continueToGoogle() {
    if (!draft.trim()) return;
    if (await copyReview()) window.location.assign(business.googleReviewUrl);
  }

  const fieldClass = "mt-2 w-full rounded-md border border-[#d7dce0] bg-[#fafbfb] px-4 py-3.5 text-sm leading-6 text-[#151719] outline-none transition-colors placeholder:text-[#879098] focus:border-[#779e00] focus:bg-white focus:ring-2 focus:ring-[#c6ff00]/30";

  return (
    <div className="review-experience min-h-screen bg-[#f7f8f8] font-sans text-[#151719] [color-scheme:light]">
      <main className="mx-auto max-w-[760px] px-5 pb-14 pt-9 sm:px-8 sm:pt-14">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-[#e3e7e9] bg-white shadow-[0_8px_28px_rgba(13,13,13,0.06)] sm:h-24 sm:w-24">
            <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-[#0d0d0d] sm:h-16 sm:w-16">
              <Image src={business.logoMark} alt={`${business.name} logo`} fill sizes="64px" className="object-cover object-left" priority />
            </div>
          </div>
          <p className="mt-7 text-xs font-bold uppercase tracking-[0.16em] text-[#536a09]">{business.name}</p>
          <h1 className="mx-auto mt-3 max-w-[620px] font-display text-[clamp(2rem,5vw,3.25rem)] font-extrabold leading-[1.12]">
            Tell us about <span className="block whitespace-nowrap decoration-[#c6ff00] decoration-[0.16em] underline-offset-[0.09em] underline">your experience.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-[510px] text-base leading-7 text-[#59616a]">
            Share what really happened. We&apos;ll help you write a review you can edit before posting.
          </p>
        </div>

        <form onSubmit={generate} className="mt-10 overflow-hidden rounded-lg border border-[#e1e5e7] bg-white p-5 shadow-[0_16px_40px_rgba(13,13,13,0.05)] sm:p-9">
          <div className="mb-7 flex items-center gap-4">
            <h2 className="whitespace-nowrap text-xs font-bold uppercase tracking-[0.13em] text-[#59616a]">Your experience</h2>
            <span className="h-px flex-1 bg-[#e4e8ea]" />
          </div>
          <fieldset>
            <legend className="text-sm font-semibold">How would you rate your experience? <span className="font-normal text-[#737d84]">Optional</span></legend>
            <div className="mt-3 flex gap-1" aria-label="Your star rating">
              {[1, 2, 3, 4, 5].map((value) => (
                <button key={value} type="button" aria-label={`${value} ${value === 1 ? "star" : "stars"}`} aria-pressed={rating === value}
                  onClick={() => setRating(rating === value ? 0 : value)}
                  className="flex h-11 w-11 items-center justify-center rounded-md transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#779e00]">
                  <Star aria-hidden="true" className={`h-8 w-8 ${value <= rating ? "fill-[#c6ff00] text-[#698800]" : "fill-[#e7e9ea] text-[#c6cbd0]"}`} />
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-7">
            <label htmlFor="review-service" className="block text-sm font-semibold">What did we help with? <span className="font-normal text-[#737d84]">Optional</span></label>
            <select id="review-service" value={service} onChange={(event) => setService(event.target.value)} className={fieldClass}>
              <option value="">Choose a service</option>
              {services.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>

          <div className="mt-7">
            <label htmlFor="review-experience" className="block text-sm font-semibold">Tell us what happened in your own words <span className="text-[#9b2828]">*</span></label>
            <textarea id="review-experience" required minLength={20} maxLength={900} rows={5} value={experience}
              onChange={(event) => setExperience(event.target.value)} placeholder="What stood out? What worked, or what didn't?"
              className={`${fieldClass} resize-y`} />
            <span className="mt-1 block text-right text-xs text-[#79818b]">{experience.length}/900</span>
          </div>

          <div className="mt-6">
            <label htmlFor="review-improvement" className="block text-sm font-semibold">Anything that could have been better? <span className="font-normal text-[#737d84]">Optional</span></label>
            <textarea id="review-improvement" maxLength={500} rows={2} value={improvement}
              onChange={(event) => setImprovement(event.target.value)} placeholder="Honest feedback is welcome."
              className={`${fieldClass} resize-y`} />
          </div>

          <label className="mt-7 flex cursor-pointer items-start gap-3 text-sm leading-5 text-[#4e5760]">
            <input type="checkbox" checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} className="mt-0.5 h-4 w-4 accent-[#0d0d0d]" />
            <span>This is based on my own experience with {business.name}.</span>
          </label>
          {error && <p role="alert" className="mt-5 border-l-2 border-[#b91c1c] pl-3 text-sm text-[#a11d1d]">{error}</p>}
          <button type="submit" disabled={loading || !confirmed || experience.trim().length < 20}
            className="mt-7 flex min-h-14 w-full items-center justify-center gap-2 rounded-md bg-[#c6ff00] px-5 py-3 text-sm font-bold text-[#0d0d0d] transition-colors hover:bg-[#b4e900] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#779e00] disabled:cursor-not-allowed disabled:opacity-45">
            {loading ? <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" /> : <ArrowRight aria-hidden="true" className="h-4 w-4" />}
            {loading ? "Writing your draft..." : "Generate my review"}
          </button>
          <p className="mt-4 text-center text-xs leading-5 text-[#707982]">AI helps with wording only. Your feedback can be positive, mixed, or negative.</p>
        </form>

        {draft && (
          <div ref={draftRef} className="mt-6 rounded-lg border border-[#dfe5e7] bg-white p-5 shadow-[0_12px_32px_rgba(13,13,13,0.04)] sm:p-9">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="font-display text-xl font-bold">Your review draft</h2>
              <button type="button" onClick={() => { setDraft(""); setCopied(false); }} className="flex items-center gap-1 text-xs font-semibold text-[#59616a] hover:text-[#151719]">
                <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" /> Start again
              </button>
            </div>
            <p className="mb-4 text-sm leading-6 text-[#59616a]">Edit anything that doesn&apos;t sound like you. You&apos;ll choose your rating again on Google.</p>
            <label htmlFor="review-draft" className="sr-only">Edit your review draft</label>
            <textarea id="review-draft" value={draft} maxLength={1200} rows={6}
              onChange={(event) => { setDraft(event.target.value); setCopied(false); }} className={`${fieldClass} resize-y text-base`} />
            {copied && <p role="status" className="mt-3 flex items-center gap-2 text-sm font-medium text-[#3f5a18]"><Check aria-hidden="true" className="h-4 w-4" /> Copied. Paste it into Google&apos;s review box.</p>}
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={continueToGoogle} disabled={!draft.trim()} className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-md bg-[#0d0d0d] px-5 py-3 text-sm font-bold text-white hover:bg-[#2e3031] disabled:opacity-45">
                Copy &amp; post on Google <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </button>
              <button type="button" onClick={copyReview} disabled={!draft.trim()} className="flex min-h-12 items-center justify-center gap-2 rounded-md border border-[#cbd1d6] bg-white px-5 py-3 text-sm font-semibold hover:bg-[#f3f5f5] disabled:opacity-45">
                <Copy aria-hidden="true" className="h-4 w-4" /> Copy only
              </button>
            </div>
            <p className="mt-4 text-center text-xs leading-5 text-[#707982]">Nothing is posted automatically. You decide what to share.</p>
          </div>
        )}

        <footer className="mt-10 border-t border-[#e1e5e7] pt-6 text-center text-xs leading-6 text-[#778089]">
          Review assistance by <a href="https://www.vistrow.com" className="font-semibold text-[#30383d] underline-offset-2 hover:underline">Vistrow</a>. Your words remain yours.
        </footer>
      </main>
    </div>
  );
}
