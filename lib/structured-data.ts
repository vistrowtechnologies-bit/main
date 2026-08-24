import { siteName, siteUrl } from "@/lib/seo";
import type { QA } from "@/lib/content-types";
import { socialProfiles } from "@/lib/social-links";

export type JsonLdValue = Record<string, unknown>;

export const businessPhone = "+91 8080197945";

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
  address: businessAddress,
  geo: businessGeo,
  sameAs: socialProfiles.map((profile) => profile.href),
  description:
    "Vistrow connects digital marketing, CRM, AI voice calling, business automation, and conversion tracking into measurable growth systems.",
  areaServed: [...serviceLocalities, "Maharashtra", "India", "Worldwide"],
  knowsAbout: [
    "Digital marketing",
    "Performance advertising",
    "Lead generation",
    "CRM implementation",
    "AI voice agents",
    "Business automation",
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
}): JsonLdValue {
  return {
    "@type": "ProfessionalService",
    "@id": `${siteUrl}${input.path}#localbusiness`,
    name: input.name,
    description: input.description,
    url: `${siteUrl}${input.path}`,
    telephone: businessPhone,
    email: "hello@vistrow.com",
    address: businessAddress,
    geo: businessGeo,
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

export function productSchema(input: {
  name: string;
  description: string;
  path: string;
  externalUrl?: string;
}): JsonLdValue {
  return {
    "@type": "Product",
    "@id": `${siteUrl}${input.path}#product`,
    name: input.name,
    description: input.description,
    url: `${siteUrl}${input.path}`,
    brand: { "@type": "Brand", name: siteName },
    manufacturer: { "@id": `${siteUrl}/#organization` },
    ...(input.externalUrl ? { sameAs: input.externalUrl } : {}),
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  path: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  schemaType?: "BlogPosting" | "Article" | "NewsArticle";
  image?: string;
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
