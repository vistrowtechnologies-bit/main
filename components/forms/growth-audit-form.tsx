"use client";

import { useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { Field, Input, Select, Textarea } from "@/components/forms/fields";
import { trackLead } from "@/lib/analytics";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const industries = ["Real Estate", "Local Business", "B2B", "Startup / SaaS", "Agency", "Education", "Other"];
const budgets = ["< ₹50k / month", "₹50k–₹1L / month", "₹1L–₹3L / month", "₹3L–₹10L / month", "₹10L+ / month"];
const channelOptions = ["Google Ads", "Meta Ads", "LinkedIn", "SEO / Content", "Email", "Referral / Word of mouth", "Not running yet"];
const serviceOptions = ["Performance Advertising", "Lead Generation", "CRM & Lead Management", "AI Voice Calling", "Automation", "Custom SaaS"];

export function GrowthAuditForm() {
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [values, setValues] = useState<Record<string, string>>({});
  const [channels, setChannels] = useState<string[]>([]);
  const [services, setServices] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const set = (k: string, v: string) => setValues((p) => ({ ...p, [k]: v }));

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!values.name?.trim()) e.name = "Please enter your name.";
    if (!values.email?.trim()) e.email = "Please enter your work email.";
    else if (!emailRe.test(values.email)) e.email = "Please enter a valid email address.";
    if (!values.company?.trim()) e.company = "Please enter your company.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validateStep1()) setStep(1);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (!consent) err.consent = "Please agree to be contacted.";
    setErrors(err);
    if (Object.keys(err).length > 0) return;

    setSubmitting(true);
    setServerError("");
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "growth-audit",
          ...values,
          message: values.challenge || "Growth Audit requested",
          channels,
          services,
          preferredContact: values.contact,
          consent,
        }),
      });
      const result = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !result.ok) throw new Error(result.error || "Request delivery failed.");
      trackLead("growth_audit_form");
      setSubmitted(true);
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : "We couldn't send your request. Please email hello@vistrow.com.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const toggle = (list: string[], setList: (v: string[]) => void, item: string) =>
    setList(list.includes(item) ? list.filter((x) => x !== item) : [...list, item]);

  if (submitted) {
    return (
      <div className="glass rounded-xl p-8 text-center sm:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-tint">
          <CheckCircle2 className="h-8 w-8 text-accent-ink" strokeWidth={2} />
        </div>
        <h3 className="mt-6 font-display text-h3 text-ink">Your Growth Audit request is in</h3>
        <p className="mx-auto mt-3 max-w-md font-sans text-muted">
          We&apos;ll review the context and contact you to confirm fit, the right participants,
          and the next conversation. Implementation is scoped separately.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="glass rounded-xl p-6 sm:p-8">
      {/* progress */}
      <div className="mb-6 flex items-center gap-3">
        {[0, 1].map((s) => (
          <div key={s} className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
            <div
              className={`h-full rounded-full bg-accent transition-all duration-300 ${
                step >= s ? "w-full" : "w-0"
              }`}
            />
          </div>
        ))}
        <span className="font-sans text-[13px] font-medium text-muted">Step {step + 1} of 2</span>
      </div>

      {step === 0 && (
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Name" htmlFor="name" required error={errors.name}>
            <Input id="name" value={values.name ?? ""} onChange={(e) => set("name", e.target.value)} placeholder="Your name" />
          </Field>
          <Field label="Work email" htmlFor="email" required error={errors.email}>
            <Input id="email" type="email" value={values.email ?? ""} onChange={(e) => set("email", e.target.value)} placeholder="you@company.com" />
          </Field>
          <Field label="Company" htmlFor="company" required error={errors.company}>
            <Input id="company" value={values.company ?? ""} onChange={(e) => set("company", e.target.value)} placeholder="Company name" />
          </Field>
          <Field label="Website" htmlFor="website">
            <Input id="website" value={values.website ?? ""} onChange={(e) => set("website", e.target.value)} placeholder="company.com" />
          </Field>
          <div className="sm:col-span-2">
            <button type="button" onClick={next} className="btn-primary w-full py-4 text-base sm:w-auto sm:px-10">
              Continue
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </button>
            <p className="mt-3 font-sans text-[13px] text-muted">Two quick steps. No obligation.</p>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Phone" htmlFor="phone">
            <Input id="phone" type="tel" value={values.phone ?? ""} onChange={(e) => set("phone", e.target.value)} placeholder="Optional" />
          </Field>
          <Field label="Industry" htmlFor="industry">
            <Select id="industry" value={values.industry ?? ""} onChange={(e) => set("industry", e.target.value)}>
              <option value="">Select industry</option>
              {industries.map((i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </Select>
          </Field>
          <Field label="Monthly marketing budget" htmlFor="budget" className="sm:col-span-2">
            <Select id="budget" value={values.budget ?? ""} onChange={(e) => set("budget", e.target.value)}>
              <option value="">Select a range</option>
              {budgets.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </Select>
          </Field>

          <fieldset className="sm:col-span-2">
            <legend className="mb-2 font-sans text-sm font-medium text-ink-2">Current marketing channels</legend>
            <div className="flex flex-wrap gap-2">
              {channelOptions.map((c) => (
                <Chip key={c} active={channels.includes(c)} onClick={() => toggle(channels, setChannels, c)}>
                  {c}
                </Chip>
              ))}
            </div>
          </fieldset>

          <fieldset className="sm:col-span-2">
            <legend className="mb-2 font-sans text-sm font-medium text-ink-2">Services of interest</legend>
            <div className="flex flex-wrap gap-2">
              {serviceOptions.map((s) => (
                <Chip key={s} active={services.includes(s)} onClick={() => toggle(services, setServices, s)}>
                  {s}
                </Chip>
              ))}
            </div>
          </fieldset>

          <Field label="Main challenge" htmlFor="challenge" className="sm:col-span-2">
            <Textarea id="challenge" value={values.challenge ?? ""} onChange={(e) => set("challenge", e.target.value)} placeholder="What's the biggest gap between your marketing and sales right now?" />
          </Field>

          <Field label="Preferred contact method" htmlFor="contact">
            <Select id="contact" value={values.contact ?? ""} onChange={(e) => set("contact", e.target.value)}>
              <option value="">Select</option>
              <option>Email</option>
              <option>Phone</option>
              <option>WhatsApp</option>
            </Select>
          </Field>

          <div className="sm:col-span-2">
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-line text-accent focus:ring-accent/40"
              />
              <span className="font-sans text-sm text-ink-2">
                I agree to be contacted about my Growth Audit and accept the{" "}
                <a href="/privacy-policy" className="text-accent-strong underline-offset-2 hover:underline">
                  Privacy Policy
                </a>
                .
              </span>
            </label>
            {errors.consent && (
              <p className="mt-1.5 font-sans text-[13px] text-error" role="alert">{errors.consent}</p>
            )}
          </div>

          <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row">
            <button type="button" onClick={() => setStep(0)} className="btn-secondary py-4 text-base">
              <ArrowLeft className="h-4 w-4" strokeWidth={2} />
              Back
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary flex-1 py-4 text-base disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Sending request" : "Request my Growth Audit"}
              {submitting ? (
                <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
              ) : (
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              )}
            </button>
          </div>
          {serverError && (
            <div className="flex items-start gap-3 rounded-lg border border-error/30 bg-error/5 p-4 sm:col-span-2" role="alert">
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
        </div>
      )}
    </form>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-4 py-2 font-sans text-sm font-medium transition-colors ${
        active
          ? "border-accent bg-accent-tint text-accent-ink"
          : "border-line bg-card text-ink-2 hover:border-accent/50"
      }`}
    >
      {children}
    </button>
  );
}
