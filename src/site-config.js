/**
 * Single place to activate integrations once real credentials exist.
 * Everything here stays inactive (no network calls, no rendered buttons)
 * until a real value is filled in — nothing here is fabricated.
 */
export const siteConfig = {
  // Public production origin used for canonical URLs, structured page locations, and sitemap parity.
  siteUrl: 'https://www.vistrow.com',

  // Formspree form endpoint, e.g. 'https://formspree.io/f/abcdwxyz'.
  formspreeEndpoint: 'https://formspree.io/f/xqevjjqw',

  // Inbox that should receive leads — also used as a fallback contact line.
  contactEmail: 'hello@vistrow.com',

  // WhatsApp number in international format without symbols, e.g. '919876543210'.
  whatsappNumber: '918080197945',

  // Phone number for click-to-call, e.g. '+919876543210'.
  phoneNumber: '+918080197945',

  // GA4 Measurement ID, e.g. 'G-XXXXXXXXXX'.
  gaMeasurementId: 'G-89YNYQBBB3'
};
