"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { CONSENT_SETTINGS_EVENT, readConsent, saveConsent, type ConsentChoice } from "@/lib/consent";

// Two layers, as consent guidance expects: a short first layer with equal-weight Accept all /
// Reject all / Customise, and a preferences layer with each category explained and off by default.
// Reopened from "Cookie settings" in the footer.
export function CookieBanner() {
  const [open, setOpen] = useState(false);
  const [customising, setCustomising] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) return;
    if (readConsent() === null) setOpen(true);
    const reopen = () => {
      setAnalytics(readConsent() === "granted");
      setCustomising(true);
      setOpen(true);
    };
    window.addEventListener(CONSENT_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_SETTINGS_EVENT, reopen);
  }, []);

  if (!open) return null;

  const choose = (choice: ConsentChoice) => {
    saveConsent(choice);
    setOpen(false);
    setCustomising(false);
  };

  // Accept and reject share one style so neither choice is pushed.
  const choiceButton =
    "rounded-sm border border-line bg-surface px-4 py-2.5 font-sans text-sm font-semibold text-ink transition-colors hover:border-ink/40";

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      className="fixed inset-x-4 bottom-4 z-[60] max-h-[calc(100vh-2rem)] overflow-y-auto rounded-xl border border-line bg-card p-5 shadow-2xl sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-md print:hidden"
    >
      {!customising ? (
        <>
          <p id="cookie-banner-title" className="font-display text-base font-bold text-ink">
            Your privacy choices
          </p>
          <p className="mt-2 font-sans text-[13px] leading-relaxed text-muted">
            We use essential cookies to make this site work. With your permission, we would also like to use
            analytics cookies to understand how the site is used. Nothing optional is set until you choose.{" "}
            <Link href="/cookie-policy" className="font-semibold text-ink underline underline-offset-2 hover:text-accent-strong">
              Cookie Policy
            </Link>
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button type="button" onClick={() => choose("denied")} className={choiceButton}>
              Reject all
            </button>
            <button type="button" onClick={() => choose("granted")} className={choiceButton}>
              Accept all
            </button>
          </div>
          <button
            type="button"
            onClick={() => {
              setAnalytics(readConsent() === "granted");
              setCustomising(true);
            }}
            className="mt-3 w-full text-center font-sans text-[13px] font-semibold text-muted underline-offset-2 hover:text-ink hover:underline"
          >
            Customise
          </button>
        </>
      ) : (
        <>
          <p id="cookie-banner-title" className="font-display text-base font-bold text-ink">
            Cookie preferences
          </p>
          <p className="mt-1.5 font-sans text-[13px] leading-relaxed text-muted">
            Choose which cookies we may use. You can change this at any time from &ldquo;Cookie settings&rdquo; in the footer.
          </p>

          <ul className="mt-4 divide-y divide-line rounded-lg border border-line">
            <li className="p-4">
              <div className="flex items-center justify-between gap-4">
                <p className="font-sans text-sm font-semibold text-ink">Essential</p>
                <span className="font-sans text-xs font-semibold text-muted">Always on</span>
              </div>
              <p className="mt-1 font-sans text-[12.5px] leading-relaxed text-muted">
                Keep the site working and remember your theme and privacy choices.
              </p>
            </li>
            <li className="p-4">
              <div className="flex items-center justify-between gap-4">
                <p className="font-sans text-sm font-semibold text-ink">Analytics</p>
                <Toggle checked={analytics} onChange={setAnalytics} label="Analytics cookies" />
              </div>
              <p className="mt-1 font-sans text-[12.5px] leading-relaxed text-muted">
                Help us see which pages are useful, so we can improve the site.
              </p>
              <details className="group mt-2">
                <summary className="inline-flex cursor-pointer list-none items-center gap-1 font-sans text-[12.5px] font-semibold text-ink-2 underline-offset-2 hover:underline [&::-webkit-details-marker]:hidden">
                  Cookie details
                  <ChevronDown className="h-3.5 w-3.5 transition-transform group-open:rotate-180" strokeWidth={2.25} />
                </summary>
                <table className="mt-2 w-full font-sans text-[12px] text-muted">
                  <tbody>
                    <tr className="border-t border-line">
                      <td className="py-1.5 pr-3 font-semibold text-ink-2">_ga, _ga_*</td>
                      <td className="py-1.5 pr-3">Google Analytics (Google)</td>
                      <td className="py-1.5 text-right">2 years</td>
                    </tr>
                  </tbody>
                </table>
              </details>
            </li>
          </ul>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <button type="button" onClick={() => choose("denied")} className={choiceButton}>
              Reject all
            </button>
            <button type="button" onClick={() => choose(analytics ? "granted" : "denied")} className={choiceButton}>
              Save choices
            </button>
            <button type="button" onClick={() => choose("granted")} className={choiceButton}>
              Accept all
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (value: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative mt-0.5 inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors ${
        checked ? "border-accent bg-accent" : "border-line bg-surface"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full shadow transition-transform ${
          checked ? "translate-x-6 bg-accent-ink" : "translate-x-1 bg-muted"
        }`}
      />
    </button>
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
