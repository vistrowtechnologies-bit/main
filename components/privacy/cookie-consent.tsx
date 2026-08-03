"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";

type CookieChoice = "accepted" | "declined" | null;

const storageKey = "vistrow-analytics-consent";

export function CookieConsent() {
  const [choice, setChoice] = useState<CookieChoice>(null);
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    setChoice(saved === "accepted" || saved === "declined" ? saved : null);

    const reopen = () => setChoice(null);
    window.addEventListener("vistrow:cookie-settings", reopen);
    return () => window.removeEventListener("vistrow:cookie-settings", reopen);
  }, []);

  const save = (next: Exclude<CookieChoice, null>) => {
    window.localStorage.setItem(storageKey, next);
    setChoice(next);
  };

  return (
    <>
      {choice === "accepted" && measurementId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${measurementId}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {choice === null && (
        <div className="fixed inset-x-4 bottom-4 z-[90] mx-auto max-w-2xl rounded-xl border border-line bg-card/95 p-5 shadow-lift backdrop-blur-xl sm:flex sm:items-center sm:gap-5">
          <p className="flex-1 font-sans text-sm leading-relaxed text-ink-2">
            We use optional analytics to understand site usage. Essential preferences work without analytics. Read the{" "}
            <Link href="/cookie-policy" className="font-semibold text-accent-strong hover:underline">
              Cookie Policy
            </Link>
            .
          </p>
          <div className="mt-4 flex gap-2 sm:mt-0">
            <button type="button" onClick={() => save("declined")} className="btn-secondary min-h-11 flex-1 px-4 sm:flex-none">
              Only necessary
            </button>
            <button type="button" onClick={() => save("accepted")} className="btn-primary min-h-11 flex-1 px-4 sm:flex-none">
              Allow analytics
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("vistrow:cookie-settings"))}
      className="min-h-11 font-sans text-[13px] text-muted transition-colors hover:text-accent-strong"
    >
      Cookie Settings
    </button>
  );
}
