"use client";

import { useState, type FormEvent } from "react";
import { AlertCircle, ArrowRight, Loader2 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Field, Input } from "@/components/forms/fields";
import { SuccessCelebration } from "@/components/forms/success-celebration";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Mirrors the 10 questions in the Client Onboarding SOP's discovery
// questionnaire exactly - keep the two in sync if the questions change.
const questions: { key: keyof Answers; label: string; options: string[]; multi?: boolean }[] = [
  { key: "businessType", label: "What best describes your business?", options: ["Real estate", "Local business", "B2B / professional services", "Startup or SaaS", "Agency", "Education", "Other"] },
  { key: "socialPlatforms", label: "Which social platforms is your business currently active on?", options: ["Instagram", "Facebook", "LinkedIn", "YouTube", "None yet"], multi: true },
  { key: "socialActivity", label: "How would you describe that activity?", options: ["Active and consistent", "Occasional, no real schedule", "Dormant - profiles exist but unused", "We don't have any social presence"] },
  { key: "leadSource", label: "Where do most of your leads come from today?", options: ["Referrals / word of mouth", "Paid ads", "Organic search / SEO", "Social media", "Cold outreach", "A mix, roughly even"] },
  { key: "crmUsage", label: "Do you currently use a CRM?", options: ["Yes", "No, we track leads in spreadsheets", "No, we don't track leads systematically"] },
  { key: "hasWebsite", label: "Do you have a website today?", options: ["Yes, and we're happy with it", "Yes, but it needs work", "No, we don't have one yet"] },
  { key: "budgetRange", label: "Approximate monthly marketing budget", options: ["Under ₹25,000", "₹25,000-₹1,00,000", "₹1,00,000-₹5,00,000", "Above ₹5,00,000", "Not decided yet"] },
  { key: "teamSize", label: "Team size handling marketing or sales today", options: ["Just me / the founder", "1-3 people", "4-10 people", "A dedicated team (10+)"] },
  { key: "biggestChallenge", label: "What's the single biggest challenge right now?", options: ["Not enough leads coming in", "Leads come in but don't convert", "No time to follow up properly", "We don't know what's actually working", "Something else"] },
  { key: "timeline", label: "How soon do you want to start?", options: ["Immediately", "Within a month", "1-3 months out", "Just exploring for now"] },
];

type Answers = {
  businessType: string;
  socialPlatforms: string[];
  socialActivity: string;
  leadSource: string;
  crmUsage: string;
  hasWebsite: string;
  budgetRange: string;
  teamSize: string;
  biggestChallenge: string;
  timeline: string;
};

const emptyAnswers: Answers = {
  businessType: "",
  socialPlatforms: [],
  socialActivity: "",
  leadSource: "",
  crmUsage: "",
  hasWebsite: "",
  budgetRange: "",
  teamSize: "",
  biggestChallenge: "",
  timeline: "",
};

export function ClientDiscoveryForm() {
  const [contact, setContact] = useState({ name: "", email: "", company: "", phone: "" });
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const [crmName, setCrmName] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const selectSingle = (key: keyof Answers, option: string) => setAnswers((prev) => ({ ...prev, [key]: option }));
  const toggleMulti = (key: keyof Answers, option: string) =>
    setAnswers((prev) => {
      const current = prev[key] as string[];
      return { ...prev, [key]: current.includes(option) ? current.filter((o) => o !== option) : [...current, option] };
    });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (!contact.name.trim()) err.name = "Please enter your name.";
    if (!emailRe.test(contact.email)) err.email = "Please enter a valid email address.";
    if (!contact.company.trim()) err.company = "Please enter your company.";
    for (const q of questions) {
      const value = answers[q.key];
      const isEmpty = q.multi ? (value as string[]).length === 0 : !value;
      if (isEmpty) err[q.key] = "Please select an answer.";
    }
    setErrors(err);
    if (Object.keys(err).length > 0) return;

    setSubmitting(true);
    setServerError("");
    try {
      const response = await fetch("/api/client-discovery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...contact, ...answers, crmName: answers.crmUsage === "Yes" ? crmName : "" }),
      });
      const result = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !result.ok) throw new Error(result.error || "Submission failed.");
      setSubmitted(true);
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "We couldn't save your response. Please email hello@vistrow.com.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) return <DiscoverySuccess />;

  return (
    <form onSubmit={onSubmit} noValidate className="glass rounded-xl p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="dc-name" required error={errors.name}>
          <Input id="dc-name" value={contact.name} onChange={(e) => setContact((p) => ({ ...p, name: e.target.value }))} placeholder="Your name" />
        </Field>
        <Field label="Work email" htmlFor="dc-email" required error={errors.email}>
          <Input id="dc-email" type="email" value={contact.email} onChange={(e) => setContact((p) => ({ ...p, email: e.target.value }))} placeholder="you@company.com" />
        </Field>
        <Field label="Company" htmlFor="dc-company" required error={errors.company}>
          <Input id="dc-company" value={contact.company} onChange={(e) => setContact((p) => ({ ...p, company: e.target.value }))} placeholder="Company name" />
        </Field>
        <Field label="Phone" htmlFor="dc-phone">
          <Input id="dc-phone" type="tel" value={contact.phone} onChange={(e) => setContact((p) => ({ ...p, phone: e.target.value }))} placeholder="Optional" />
        </Field>
      </div>

      <div className="mt-8 space-y-7">
        {questions.map((q, index) => (
          <fieldset key={q.key}>
            <legend className="mb-2 font-sans text-sm font-medium text-ink-2">
              {index + 1}. {q.label}
              {q.multi && <span className="ml-1.5 font-normal text-muted">(select all that apply)</span>}
            </legend>
            <div className="flex flex-wrap gap-2">
              {q.options.map((option) => {
                const active = q.multi ? (answers[q.key] as string[]).includes(option) : answers[q.key] === option;
                return (
                  <Chip key={option} active={active} onClick={() => (q.multi ? toggleMulti(q.key, option) : selectSingle(q.key, option))}>
                    {option}
                  </Chip>
                );
              })}
            </div>
            {q.key === "crmUsage" && answers.crmUsage === "Yes" && (
              <Input
                className="mt-3 max-w-xs"
                value={crmName}
                onChange={(e) => setCrmName(e.target.value)}
                placeholder="Which CRM?"
              />
            )}
            {errors[q.key] && (
              <p className="mt-1.5 font-sans text-[13px] text-error" role="alert">{errors[q.key]}</p>
            )}
          </fieldset>
        ))}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="btn-primary mt-8 w-full py-4 text-base disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-10"
      >
        {submitting ? "Sending" : "Submit"}
        {submitting ? <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} /> : <ArrowRight className="h-4 w-4" strokeWidth={2} />}
      </button>

      {serverError && (
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
    </form>
  );
}

function DiscoverySuccess() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-xl p-8 text-center sm:p-12"
      role="status"
    >
      <SuccessCelebration />
      <h3 className="mt-6 font-display text-h3 text-ink">Thanks - we've got it</h3>
      <p className="mx-auto mt-3 max-w-md font-sans text-muted">
        Your answers are with the Vistrow team now. We&apos;ll use them to prepare for our next conversation.
      </p>
    </motion.div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-4 py-2 font-sans text-sm font-medium transition-colors ${
        active ? "border-accent bg-accent-tint text-accent-ink" : "border-line bg-card text-ink-2 hover:border-accent/50"
      }`}
    >
      {children}
    </button>
  );
}
