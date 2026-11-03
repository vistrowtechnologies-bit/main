import { siteName, siteUrl } from "@/lib/seo";
import type { QA } from "@/lib/content-types";
import { socialProfiles } from "@/lib/social-links";

export type JsonLdValue = Record<string, unknown>;

export const businessPhone = "+91 90670 97779";
// Bare link for schema.org (a canonical contact point, not a specific
// pre-filled action) - UI links use businessWhatsapp below instead, which
// pre-fills the chat so it already says the person came from the website.
const WHATSAPP_BASE_URL = "https://wa.me/919067097779";
const WHATSAPP_PREFILL = "Hi Vistrow, I'm reaching out from your website and would like to know more.";
export const businessWhatsapp = `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(WHATSAPP_PREFILL)}`;

export const businessAddress: JsonLdValue = {
  "@type": "PostalAddress",
  addressLocality: "Baner",
  addressRegion: "Maharashtra",
  postalCode: "411045",
  addressCountry: "IN",
};

export const businessGeo: JsonLdValue = {
  "@type": "GeoCoordinates",
  latitude: 18.559,
  longitude: 73.7868,
};

// Localities Vistrow actively targets for local search, in addition to Pune city and India-wide reach.
export const serviceLocalities = [
  "Pune",
  "Baner",
  "Pimpri-Chinchwad",
  "Hinjewadi",
  "Wakad",
  "Kothrud",
];

export const organizationSchema: JsonLdValue = {
  "@type": ["Organization", "ProfessionalService"],
  "@id": `${siteUrl}/#organization`,
  name: "Vistrow Technologies",
  alternateName: siteName,
  url: siteUrl,
  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}/icon.png`,
    width: 512,
    height: 512,
  },
  image: `${siteUrl}/icon.png`,
  telephone: businessPhone,
  email: "hello@vistrow.com",
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: businessPhone,
      email: "hello@vistrow.com",
      contactType: "customer service",
      areaServed: ["IN", "Worldwide"],
      availableLanguage: ["English", "Hindi"],
    },
    {
      "@type": "ContactPoint",
      telephone: businessPhone,
      contactType: "sales",
      areaServed: ["IN", "Worldwide"],
      availableLanguage: ["English", "Hindi"],
    },
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: WHATSAPP_BASE_URL,
      areaServed: ["IN", "Worldwide"],
      availableLanguage: ["English", "Hindi"],
    },
  ],
  address: businessAddress,
  geo: businessGeo,
  sameAs: socialProfiles.map((profile) => profile.href),
  description:
    "Vistrow is an AI agency in Pune, building AI voice agents, WhatsApp AI agents and AI CRM, and connecting them to digital marketing, business automation and conversion tracking.",
  areaServed: [...serviceLocalities, "Maharashtra", "India", "Worldwide"],
  knowsAbout: [
    "AI agency",
    "WhatsApp AI agents",
    "Digital marketing",
    "Performance advertising",
    "Lead generation",
    "CRM implementation",
    "AI voice agents",
    "Business automation",
    "AI automation",
    "Conversion tracking",
  ],
};

export const websiteSchema: JsonLdValue = {
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: siteName,
  alternateName: "Vistrow Technologies",
  publisher: { "@id": `${siteUrl}/#organization` },
  inLanguage: "en",
};

export function graph(items: JsonLdValue[]): JsonLdValue {
  return { "@context": "https://schema.org", "@graph": items };
}

export function breadcrumbSchema(items: { name: string; path: string }[]): JsonLdValue {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path === "/" ? siteUrl : `${siteUrl}${item.path}`,
    })),
  };
}

export function faqSchema(items: QA[]): JsonLdValue {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function localBusinessSchema(input: {
  name: string;
  description: string;
  path: string;
  areaServed: string[];
  hasOffice?: boolean;
}): JsonLdValue {
  const withOffice = input.hasOffice !== false;
  return {
    "@type": "ProfessionalService",
    "@id": `${siteUrl}${input.path}#localbusiness`,
    name: input.name,
    description: input.description,
    url: `${siteUrl}${input.path}`,
    telephone: businessPhone,
    email: "hello@vistrow.com",
    ...(withOffice ? { address: businessAddress, geo: businessGeo } : {}),
    parentOrganization: { "@id": `${siteUrl}/#organization` },
    areaServed: input.areaServed.map((name) => ({ "@type": "City", name })),
    priceRange: "₹₹",
  };
}

export function serviceSchema(input: {
  name: string;
  description: string;
  path: string;
  category: string;
}): JsonLdValue {
  return {
    "@type": "Service",
    "@id": `${siteUrl}${input.path}#service`,
    name: input.name,
    description: input.description,
    serviceType: input.category,
    url: `${siteUrl}${input.path}`,
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: ["India", "Worldwide"],
  };
}

// Google only accepts a Product when it carries an offer, a review or a rating. A product with a published price
// (ArthaLeads) is described as a Product with that offer; one without a public price (Vistrow Voice, Vistrow Labs)
// is described as a Service instead, so no price is ever invented.
export function productSchema(input: {
  name: string;
  description: string;
  path: string;
  externalUrl?: string;
  offers?: JsonLdValue;
}): JsonLdValue {
  const base = {
    name: input.name,
    description: input.description,
    url: `${siteUrl}${input.path}`,
    brand: { "@type": "Brand", name: siteName },
    ...(input.externalUrl ? { sameAs: input.externalUrl } : {}),
  };
  if (!input.offers) {
    return {
      "@type": "Service",
      "@id": `${siteUrl}${input.path}#service`,
      serviceType: "Software",
      provider: { "@id": `${siteUrl}/#organization` },
      areaServed: ["India", "Worldwide"],
      ...base,
    };
  }
  return {
    "@type": "Product",
    "@id": `${siteUrl}${input.path}#product`,
    manufacturer: { "@id": `${siteUrl}/#organization` },
    offers: input.offers,
    ...base,
  };
}

// ArthaLeads list prices, as published on its pricing page (per user per month, plus 18% GST, five-seat minimum).
export const arthaLeadsOffers: JsonLdValue = {
  "@type": "AggregateOffer",
  priceCurrency: "INR",
  lowPrice: "599",
  highPrice: "999",
  offerCount: 2,
  url: "https://www.arthaleads.com/pricing",
  offers: [
    { "@type": "Offer", name: "Starter", price: "599", priceCurrency: "INR", description: "Per user per month plus 18% GST, five-seat minimum, 14-day free trial", url: "https://www.arthaleads.com/pricing" },
    { "@type": "Offer", name: "Growth", price: "999", priceCurrency: "INR", description: "Per user per month plus 18% GST, five-seat minimum, 14-day free trial", url: "https://www.arthaleads.com/pricing" },
  ],
};

export function articleSchema(input: {
  title: string;
  description: string;
  path: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  schemaType?: "BlogPosting" | "Article" | "NewsArticle";
  image?: string | string[];
  keywords?: string[];
  articleSection?: string;
}): JsonLdValue {
  return {
    "@type": input.schemaType || "BlogPosting",
    "@id": `${siteUrl}${input.path}#article`,
    headline: input.title,
    description: input.description,
    url: `${siteUrl}${input.path}`,
    datePublished: input.datePublished,
    dateModified: input.dateModified || input.datePublished,
    author: { "@type": "Organization", name: input.author },
    publisher: { "@id": `${siteUrl}/#organization` },
    isPartOf: { "@id": `${siteUrl}/#website` },
    mainEntityOfPage: `${siteUrl}${input.path}`,
    ...(input.image ? { image: input.image } : {}),
    ...(input.keywords?.length ? { keywords: input.keywords.join(", ") } : {}),
    ...(input.articleSection ? { articleSection: input.articleSection } : {}),
  };
}

export function collectionSchema(input: {
  name: string;
  description: string;
  path: string;
  items: { name: string; path: string }[];
}): JsonLdValue {
  return {
    "@type": "CollectionPage",
    "@id": `${siteUrl}${input.path}#collection`,
    name: input.name,
    description: input.description,
    url: `${siteUrl}${input.path}`,
    isPartOf: { "@id": `${siteUrl}/#website` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: input.items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: `${siteUrl}${item.path}`,
      })),
    },
  };
}
