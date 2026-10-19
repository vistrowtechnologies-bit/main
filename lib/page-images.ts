// Photos used on fixed pages (content-driven pages keep theirs in content/*). Pages and the image
// sitemap both read from here, so a photo and its alt text are defined once.
export type PageImage = { src: string; alt: string };

export const PAGE_IMAGES = {
  homeDigitalMarketing: { src: "/images/home/service-digital-marketing.webp", alt: "Marketers reviewing the Vistrow website on a blue iMac in a Pune office" },
  homeDigitalMarketingPortrait: { src: "/images/home/service-digital-marketing-portrait.webp", alt: "Marketers reviewing the Vistrow website on a blue iMac in a Pune office" },
  homeCrm: { src: "/images/home/service-crm.webp", alt: "Telecaller working through the ArthaLeads lead pipeline on a MacBook Air while his manager looks on" },
  homeProducts: { src: "/images/home/products.webp", alt: "ArthaLeads CRM dashboard on a MacBook Air beside Vistrow Voice on an iPhone" },
  homePune: { src: "/images/home/pune-local.webp", alt: "Pune showroom owner reviewing WhatsApp enquiries in the ArthaLeads inbox with her assistant" },
  about: { src: "/images/brand/office-wall-logo.webp", alt: "Vistrow team reviewing the Vistrow website on an iMac in the Baner office, logo on the wall" },
  careers: { src: "/images/brand/desk-branded-items.webp", alt: "New Vistrow team member opening the careers page on a MacBook Air, Vistrow notebook on the desk" },
  contact: { src: "/images/brand/reception-logo.webp", alt: "Vistrow reception in Baner, Pune, with the contact page open on an iMac and the logo on the wall" },
  growthAudit: { src: "/images/brand/meeting-room-logo.webp", alt: "Vistrow consultant walking a client through a growth audit on a MacBook Air" },
  services: { src: "/images/pages/digital-marketing-and-automation-services-team.webp", alt: "Vistrow team in a Pune office at a morning stand-up, planning client marketing and automation work" },
  digitalMarketing: { src: "/images/pages/digital-marketing-services-pune-team.webp", alt: "Overhead view of a digital marketing planning table with an example campaign dashboard, printed ad mock-ups and a content calendar" },
  businessAutomation: { src: "/images/pages/ai-automation-services-dashboard.webp", alt: "iMac showing an automated lead dashboard beside a phone with a WhatsApp enquiry notification" },
  locations: { src: "/images/pages/digital-marketing-agency-pune-meeting.webp", alt: "Vistrow consultant meeting a Pune business owner at a cafe in Baner" },
  approach: { src: "/images/pages/growth-audit-workshop.webp", alt: "Vistrow consultant drawing the audit, plan, build and improve stages on a whiteboard for a client team" },
  partners: { src: "/images/pages/agency-partnership-meeting.webp", alt: "Two agency founders reviewing the Vistrow website together while agreeing a white-label partnership" },
} satisfies Record<string, PageImage>;

// Which fixed page shows which photos (for the image sitemap).
export const ROUTE_IMAGES: Record<string, PageImage[]> = {
  "": [PAGE_IMAGES.homeDigitalMarketing, PAGE_IMAGES.homeCrm, PAGE_IMAGES.homeProducts, PAGE_IMAGES.homePune],
  "/about": [PAGE_IMAGES.about],
  "/careers": [PAGE_IMAGES.careers],
  "/contact": [PAGE_IMAGES.contact],
  "/growth-audit": [PAGE_IMAGES.growthAudit],
  "/services": [PAGE_IMAGES.services],
  "/digital-marketing": [PAGE_IMAGES.digitalMarketing],
  "/business-automation": [PAGE_IMAGES.businessAutomation],
  "/locations": [PAGE_IMAGES.locations],
  "/approach": [PAGE_IMAGES.approach],
  "/partners": [PAGE_IMAGES.partners],
};
