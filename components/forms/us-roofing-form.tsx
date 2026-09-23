"use client";

import { useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { Field, Input, Select, Textarea } from "@/components/forms/fields";
import { trackLead } from "@/lib/analytics";

type Errors = Partial<Record<"name" | "email" | "website" | "consent", string>>;
type Status = "idle" | "submitting" | "success" | "error";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const budgets = [
  "Under $2,000 (website only)",
  "$2,000–$5,000",
  "$5,000–$10,000",
  "Monthly plan preferred",
  "Not sure yet",
];

const needs = [
  "New or rebuilt website",
  "Storm / insurance claim pages",
  "Instant lead follow-up (text + email)",
  "AI answering for after-hours calls",
  "Full system: website + CRM + follow-up",
];

export function UsRoofingForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const next: Errors = {};
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const website = String(data.get("website") || "").trim();
    const consent = data.get("consent") === "on";

    if (!name) next.name = "Please enter your name.";
    if (!email) next.email = "Please enter your business email.";
    else if (!emailRe.test(email)) next.email = "Please enter a valid email address.";
    if (!website) next.website = "Add your current website, or type \"none\".";
    if (!consent) next.consent = "Please agree to be contacted.";

    setErrors(next);
    setServerError("");
    if (Object.keys(next).length > 0) return;

    const city = String(data.get("city") || "").trim();
    const need = String(data.get("need") || "");
    const notes = String(data.get("notes") || "").trim();

    setStatus("submitting");
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          name,
          email,
          company: String(data.get("company") || ""),
          phone: String(data.get("phone") || ""),
          website,
          industry: "Roofing (US)",
          service: need || "US roofing website audit",
          budget: String(data.get("budget") || ""),
          preferredContact: "Email",
          message: [
            "Free roofing website audit request (US).",
            city && `Service area: ${city}`,
            notes && `Notes: ${notes}`,
          ]
            .filter(Boolean)
            .join("\n"),
          consent,
          _gotcha: String(data.get("_gotcha") || ""),
        }),
      });
      const result = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !result.ok) throw new Error(result.error || "Message delivery failed.");
      trackLead("us_roofing_form");
      form.reset();
      setStatus("success");
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : "We couldn't send your request. Please email hello@vistrow.com.",
      );
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="glass rounded-xl p-8 text-center sm:p-12" role="status">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-tint">
          <CheckCircle2 className="h-6 w-6 text-accent-ink" strokeWidth={1.75} />
        </div>
        <h3 className="mt-5 font-display text-h3 text-ink">Your audit request is in</h3>
        <p className="mx-auto mt-3 max-w-md font-sans leading-relaxed text-muted">
          We&apos;ll review your website and Google Business Profile, then email you a short
          video walkthrough within two US business days.
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="btn-secondary mt-8 px-6 py-3 text-sm">
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="glass rounded-xl p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="rf-name" required error={errors.name}>
          <Input id="rf-name" name="name" autoComplete="name" placeholder="Your name" />
        </Field>
        <Field label="Business email" htmlFor="rf-email" required error={errors.email}>
          <Input id="rf-email" name="email" type="email" autoComplete="email" placeholder="you@yourroofing.com" />
        </Field>
        <Field label="Company" htmlFor="rf-company">
          <Input id="rf-company" name="company" autoComplete="organization" placeholder="Roofing company name" />
        </Field>
        <Field label="Current website" htmlFor="rf-website" required error={errors.website}>
          <Input id="rf-website" name="website" inputMode="url" placeholder="yourroofing.com" />
        </Field>
        <Field label="Main service area" htmlFor="rf-city">
          <Input id="rf-city" name="city" placeholder="e.g. Plano, TX" />
        </Field>
        <Field label="Phone" htmlFor="rf-phone">
          <Input id="rf-phone" name="phone" type="tel" autoComplete="tel" placeholder="Optional" />
        </Field>
        <Field label="What do you need most?" htmlFor="rf-need">
          <Select id="rf-need" name="need" defaultValue="">
            <option value="">Select one</option>
            {needs.map((n) => (
              <option key={n}>{n}</option>
            ))}
          </Select>
        </Field>
        <Field label="Budget (USD)" htmlFor="rf-budget">
          <Select id="rf-budget" name="budget" defaultValue="">
            <option value="">Prefer not to say</option>
            {budgets.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </Select>
        </Field>
        <Field label="Anything we should know?" htmlFor="rf-notes" className="sm:col-span-2">
          <Textarea
            id="rf-notes"
            name="notes"
            placeholder="Storm season volume, lead sources you use, what's frustrating about your current site..."
            className="min-h-[110px]"
          />
        </Field>

        <div className="hidden" aria-hidden="true">
          <label htmlFor="rf-gotcha">Leave this field empty</label>
          <input id="rf-gotcha" name="_gotcha" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="sm:col-span-2">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              name="consent"
              className="mt-1 h-4 w-4 rounded border-line text-accent focus:ring-accent/40"
            />
            <span className="font-sans text-sm leading-relaxed text-ink-2">
              I agree to be contacted about this request and accept the{" "}
              <a href="/privacy-policy" className="text-accent-strong underline-offset-2 hover:underline">
                Privacy Policy
              </a>
              .
            </span>
          </label>
          {errors.consent && (
            <p className="mt-1.5 font-sans text-[13px] text-error" role="alert">
              {errors.consent}
            </p>
          )}
        </div>
      </div>

      {status === "error" && (
        <div className="mt-5 flex items-start gap-3 rounded-lg border border-error/30 bg-error/5 p-4" role="alert">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-error" />
          <p className="font-sans text-sm text-ink-2">
            {serverError} You can also email{" "}
            <a href="mailto:hello@vistrow.com" className="font-semibold text-accent-strong hover:underline">
              hello@vistrow.com
            </a>
            .
          </p>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-primary py-4 text-base disabled:cursor-not-allowed disabled:opacity-60 sm:px-10"
        >
          {status === "submitting" ? (
            <>
              Sending
              <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
            </>
          ) : (
            <>
              Get my free audit
              <Send className="h-4 w-4" strokeWidth={2} />
            </>
          )}
        </button>
        <p className="font-sans text-[13px] text-muted">Free, no obligation. Video walkthrough by email.</p>
      </div>
    </form>
  );
}
