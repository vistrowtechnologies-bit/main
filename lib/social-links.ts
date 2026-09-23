// Not imported from lib/structured-data.ts - that module imports
// socialProfiles from here (for the Organization schema's sameAs list),
// so importing back from it would create a circular module dependency.
// Pre-filled so a chat that lands in the team's WhatsApp already says the
// person came from the website, instead of arriving as a bare, contextless "Hi".
const WHATSAPP_PREFILL = "Hi Vistrow, I'm reaching out from your website and would like to know more.";
const WHATSAPP_URL = `https://wa.me/919067097779?text=${encodeURIComponent(WHATSAPP_PREFILL)}`;

export const socialProfiles = [
  {
    platform: "WhatsApp",
    label: "Chat with Vistrow on WhatsApp",
    href: WHATSAPP_URL,
  },
  {
    platform: "Instagram",
    label: "Follow Vistrow on Instagram",
    href: "https://www.instagram.com/vistrow_technologies/",
  },
  {
    platform: "Facebook",
    label: "Follow Vistrow on Facebook",
    href: "https://www.facebook.com/profile.php?id=61591078569161",
  },
  {
    platform: "LinkedIn",
    label: "Follow Vistrow on LinkedIn",
    href: "https://www.linkedin.com/company/vistrow-technologies/",
  },
] as const;
