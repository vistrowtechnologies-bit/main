export type LeadSource = "contact_form" | "growth_audit_form" | "chat";

type GtagCommand = "config" | "consent" | "event" | "js";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: GtagCommand, ...args: unknown[]) => void;
  }
}

export function trackLead(source: LeadSource) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", "generate_lead", {
    lead_source: source,
  });
}
