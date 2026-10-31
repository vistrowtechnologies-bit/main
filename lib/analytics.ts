export type LeadSource = "contact_form" | "growth_audit_form" | "us_roofing_form" | "chat";

type GtagCommand = "config" | "consent" | "event" | "js";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: GtagCommand, ...args: unknown[]) => void;
  }
}

export function trackLead(source: LeadSource, extra: Record<string, string> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  // The market comes from the page path (/us, /uk, otherwise India), so leads can be split by market in GA4.
  const path = window.location.pathname;
  const market = path === "/us" || path.startsWith("/us/") ? "US" : path === "/uk" || path.startsWith("/uk/") ? "UK" : "IN";
  window.gtag("event", "generate_lead", {
    lead_source: source,
    lead_market: market,
    ...extra,
  });
}
