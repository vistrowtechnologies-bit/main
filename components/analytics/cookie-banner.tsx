"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";
import { CONSENT_SETTINGS_EVENT, readConsent, saveConsent, type ConsentChoice } from "@/lib/consent";

// Asks once for analytics consent; reopened from "Cookie settings" in the footer.
export function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) return;
    if (readConsent() === null) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(CONSENT_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_SETTINGS_EVENT, reopen);
  }, []);

  if (!open) return null;

  const choose = (choice: ConsentChoice) => {
    saveConsent(choice);
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie preferences"
      className="fixed inset-x-4 bottom-4 z-[60] rounded-xl border border-line bg-card p-5 shadow-2xl sm:inset-x-auto sm:left-6 sm:bottom-6 sm:max-w-sm print:hidden"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-accent-tint">
          <Cookie className="h-4 w-4 text-accent-ink" strokeWidth={1.75} />
        </div>
        <div>
          <p className="font-display text-base font-bold text-ink">Analytics cookies</p>
          <p className="mt-1.5 font-sans text-[13px] leading-relaxed text-muted">
            With your permission we use Google Analytics cookies to see which pages help visitors. No advertising
            cookies.{" "}
            <Link href="/cookie-policy" className="font-semibold text-accent-strong underline-offset-2 hover:underline">
              Cookie Policy
            </Link>
          </p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => choose("denied")}
          className="rounded-sm border border-line px-4 py-2.5 font-sans text-sm font-semibold text-ink transition-colors hover:border-ink/40"
        >
          Decline
        </button>
        <button
          type="button"
          onClick={() => choose("granted")}
          className="rounded-sm bg-accent px-4 py-2.5 font-sans text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90"
        >
          Accept
        </button>
      </div>
    </div>
  );
}

export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(CONSENT_SETTINGS_EVENT))}
      className={className}
    >
      Cookie settings
    </button>
  );
}
