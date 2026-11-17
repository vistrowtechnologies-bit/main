"use client";

import { useEffect } from "react";

// Sends a GA4 event when someone taps a WhatsApp, phone or email link, so enquiries that never reach a form still count.
// It uses the same gtag that the forms use, so Consent Mode applies: no analytics cookies are set before the visitor accepts.
export function ClickTracking() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest?.("a");
      const href = link?.getAttribute("href") || "";
      if (!href || typeof window.gtag !== "function") return;
      const name = /^https?:\/\/(wa\.me|api\.whatsapp\.com)\//i.test(href)
        ? "whatsapp_click"
        : href.startsWith("tel:")
          ? "phone_click"
          : href.startsWith("mailto:")
            ? "email_click"
            : null;
      if (!name) return;
      window.gtag("event", name, { link_url: href.slice(0, 120), page_path: window.location.pathname });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
