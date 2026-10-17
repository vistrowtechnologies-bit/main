// Analytics consent, stored per browser. Google Consent Mode v2: analytics and ad storage stay
// "denied" (no cookies, anonymous pings only) until the visitor accepts.
export const CONSENT_KEY = "vistrow-consent";
export const CONSENT_SETTINGS_EVENT = "vistrow:cookie-settings";

export type ConsentChoice = "granted" | "denied";

export function readConsent(): ConsentChoice | null {
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function saveConsent(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(CONSENT_KEY, choice);
  } catch {
    // Storage blocked: the choice still applies for this page view.
  }
  window.gtag?.("consent", "update", { analytics_storage: choice });
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(CONSENT_SETTINGS_EVENT));
}

// Runs inline before gtag.js loads, so the stored choice applies to the very first hit.
export const consentDefaultsScript = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
var stored = null;
try { stored = localStorage.getItem('${CONSENT_KEY}'); } catch (e) {}
gtag('consent', 'default', {
  analytics_storage: stored === 'granted' ? 'granted' : 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500
});
`;
