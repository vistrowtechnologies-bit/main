"use client";

import { useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { Field, Input, Select, Textarea } from "@/components/forms/fields";
import { trackLead } from "@/lib/analytics";

type Errors = Partial<Record<"name" | "email" | "message" | "consent", string>>;
type Status = "idle" | "submitting" | "success" | "error";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const services = [
  "Digital marketing",
  "CRM & lead management",
  "Vistrow Voice / AI calling",
  "ArthaLeads",
  "Business automation",
  "Vistrow Labs / custom software",
  "Partnership",
  "Something else",
];

export function ContactForm() {
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
    const message = String(data.get("message") || "").trim();
    const consent = data.get("consent") === "on";

    if (!name) next.name = "Please enter your name.";
    if (!email) next.email = "Please enter your work email.";
    else if (!emailRe.test(email)) next.email = "Please enter a valid email address.";
    if (message.length < 10) next.message = "Please tell us a little more about what you need.";
    if (!consent) next.consent = "Please agree to be contacted.";

    setErrors(next);
    setServerError("");
    if (Object.keys(next).length > 0) return;

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
          service: String(data.get("service") || ""),
          budget: String(data.get("budget") || ""),
          message,
          preferredContact: String(data.get("preferredContact") || ""),
          consent,
          _gotcha: String(data.get("_gotcha") || ""),
        }),
      });
      const result = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !result.ok) throw new Error(result.error || "Message delivery failed.");
      trackLead("contact_form");
      form.reset();
      setStatus("success");
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : "We couldn't send your message. Please email hello@vistrow.com.",
      );
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="glass rounded-xl p-8 text-center sm:p-12" role="status">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent">
          <CheckCircle2 className="h-8 w-8 text-accent-ink" strokeWidth={2} />
        </div>
        <h3 className="mt-6 font-display text-h3 text-ink">Your message is on its way</h3>
        <p className="mx-auto mt-3 max-w-md font-sans leading-relaxed text-muted">
          Thanks for the context. We&apos;ll review it and reply within one business day with
          the most useful next step.
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="btn-secondary mt-6">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="glass rounded-xl p-6 sm:p-8">
      <div className="mb-7">
        <span className="eyebrow">Start a conversation</span>
        <h2 className="mt-3 font-display text-h3 text-ink">Tell us what you&apos;re trying to improve</h2>
        <p className="mt-2 font-sans text-sm leading-relaxed text-muted">
          A little context helps us route your enquiry to the right person and give you a useful first response.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="name" required error={errors.name}>
          <Input id="name" name="name" autoComplete="name" placeholder="Your name" />
        </Field>
        <Field label="Work email" htmlFor="email" required error={errors.email}>
          <Input id="email" name="email" type="email" autoComplete="email" placeholder="you@company.com" />
        </Field>
        <Field label="Company" htmlFor="company">
          <Input id="company" name="company" autoComplete="organization" placeholder="Company name" />
        </Field>
        <Field label="Phone / WhatsApp" htmlFor="phone">
          <Input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="Optional" />
        </Field>
        <Field label="What can we help with?" htmlFor="service" className="sm:col-span-2">
          <Select id="service" name="service" defaultValue="">
            <option value="">Select an area</option>
            {services.map((service) => (
              <option key={service}>{service}</option>
            ))}
          </Select>
        </Field>
        <Field label="Approximate monthly budget" htmlFor="budget">
          <Select id="budget" name="budget" defaultValue="">
            <option value="">Prefer not to say</option>
            <option>Under ₹50,000</option>
            <option>₹50,000–₹1 lakh</option>
            <option>₹1–₹3 lakh</option>
            <option>₹3–₹10 lakh</option>
            <option>₹10 lakh+</option>
            <option>Project-based enquiry</option>
          </Select>
        </Field>
        <Field label="Preferred reply" htmlFor="preferredContact">
          <Select id="preferredContact" name="preferredContact" defaultValue="Email">
            <option>Email</option>
            <option>Phone</option>
            <option>WhatsApp</option>
          </Select>
        </Field>
        <Field label="How can we help?" htmlFor="message" required error={errors.message} className="sm:col-span-2">
          <Textarea
            id="message"
            name="message"
            placeholder="What are you trying to achieve, and where is the current process getting stuck?"
            className="min-h-[150px]"
          />
        </Field>

        <div className="hidden" aria-hidden="true">
          <label htmlFor="_gotcha">Leave this field empty</label>
          <input id="_gotcha" name="_gotcha" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="sm:col-span-2">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              name="consent"
              className="mt-1 h-4 w-4 rounded border-line text-accent focus:ring-accent/40"
            />
            <span className="font-sans text-sm leading-relaxed text-ink-2">
              I agree to be contacted about this enquiry and accept the{" "}
              <a href="/privacy-policy" className="text-accent-strong underline-offset-2 hover:underline">
                Privacy Policy
              </a>
              .
            </span>
          </label>
          {errors.consent && <p className="mt-1.5 font-sans text-[13px] text-error" role="alert">{errors.consent}</p>}
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
              Send message
              <Send className="h-4 w-4" strokeWidth={2} />
            </>
          )}
        </button>
        <p className="font-sans text-[13px] text-muted">We normally reply within one business day.</p>
      </div>
    </form>
  );
}
