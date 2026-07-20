"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { Field, Input, Textarea } from "@/components/forms/fields";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Errors = {};
    if (!String(data.get("name")).trim()) next.name = "Please enter your name.";
    const email = String(data.get("email")).trim();
    if (!email) next.email = "Please enter your work email.";
    else if (!emailRe.test(email)) next.email = "Please enter a valid email address.";
    if (!String(data.get("message")).trim()) next.message = "Tell us a little about your goals.";
    setErrors(next);
    if (Object.keys(next).length === 0) setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="glass rounded-xl p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-tint">
          <CheckCircle2 className="h-7 w-7 text-accent-ink" strokeWidth={2} />
        </div>
        <h3 className="mt-5 font-display text-h3 text-ink">Thanks—message received</h3>
        <p className="mx-auto mt-3 max-w-md font-sans text-muted">
          We&apos;ll get back to you shortly. For anything urgent, mention it and we&apos;ll
          prioritise your request.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="glass rounded-xl p-6 sm:p-8">
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
        <Field label="Phone" htmlFor="phone">
          <Input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="Optional" />
        </Field>
        <Field label="How can we help?" htmlFor="message" required error={errors.message} className="sm:col-span-2">
          <Textarea id="message" name="message" placeholder="Tell us about your goals and what you're working on." />
        </Field>
      </div>
      <button type="submit" className="btn-primary mt-6 w-full py-4 text-base sm:w-auto sm:px-10">
        Send message
        <Send className="h-4 w-4" strokeWidth={2} />
      </button>
      <p className="mt-4 font-sans text-[13px] text-muted">
        By submitting, you agree to our{" "}
        <a href="/privacy-policy" className="text-accent-strong underline-offset-2 hover:underline">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
