import { siteName, siteUrl } from "@/lib/seo";
import type { QA } from "@/lib/content-types";

export type JsonLdValue = Record<string, unknown>;

export const organizationSchema: JsonLdValue = {
  "@type": "Organization",
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
  email: "hello@vistrow.com",
  description:
    "Vistrow connects digital marketing, CRM, AI voice calling, business automation, and conversion tracking into measurable growth systems.",
  areaServed: ["India", "Worldwide"],
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
