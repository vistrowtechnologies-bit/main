export const analyticsConsentKey = "vistrow-analytics-consent";

export type LeadSource = "contact_form" | "growth_audit_form" | "chat";

type GtagCommand = "config" | "consent" | "event" | "js";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: GtagCommand, ...args: unknown[]) => void;
  }
}

function hasAnalyticsConsent() {
  try {
    return window.localStorage.getItem(analyticsConsentKey) === "accepted";
  } catch {
    return false;
  }
}

export function trackLead(source: LeadSource) {
  if (typeof window === "undefined" || !hasAnalyticsConsent() || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", "generate_lead", {
    lead_source: source,
  });
}
