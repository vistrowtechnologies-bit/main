/**
 * Single place to activate integrations once real credentials exist.
 * Everything here stays inactive (no network calls, no rendered buttons)
 * until a real value is filled in — nothing here is fabricated.
 */
export const siteConfig = {
  // Formspree form endpoint, e.g. 'https://formspree.io/f/abcdwxyz'.
  formspreeEndpoint: '',

  // Inbox that should receive leads — also used as a fallback contact line.
  contactEmail: '',

  // WhatsApp number in international format without symbols, e.g. '919876543210'.
  whatsappNumber: '',

  // Phone number for click-to-call, e.g. '+919876543210'.
  phoneNumber: '',

  // GA4 Measurement ID, e.g. 'G-XXXXXXXXXX'.
  gaMeasurementId: ''
};
