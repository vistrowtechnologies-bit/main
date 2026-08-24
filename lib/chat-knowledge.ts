import { digitalMarketingOverview } from "@/content/digital-marketing";
import { businessAutomationOverview } from "@/content/business-automation";
import { productsOverview, products } from "@/content/products";
import { industriesOverview } from "@/content/industries";
import { locationsOverview } from "@/content/locations";
import { workOverview } from "@/content/work";
import { siteName, siteUrl } from "@/lib/seo";
import { businessPhone, organizationSchema } from "@/lib/structured-data";

const overviewGroups = [
  { heading: "DIGITAL MARKETING SERVICES", overview: digitalMarketingOverview },
  { heading: "BUSINESS AUTOMATION SERVICES", overview: businessAutomationOverview },
  { heading: "PRODUCTS", overview: productsOverview },
  { heading: "INDUSTRIES SERVED", overview: industriesOverview },
  { heading: "LOCATIONS SERVED (PUNE)", overview: locationsOverview },
  { heading: "WORK / PROOF", overview: workOverview },
];

const evergreenPages: { label: string; href: string; body: string }[] = [
  { label: "Services hub", href: "/services", body: "Overview of every marketing and automation service." },
  { label: "Growth Audit", href: "/growth-audit", body: "A structured, free-to-request intake reviewing funnel, spend, CRM, and tracking, then recommending priorities. Two short steps, no obligation." },
  { label: "Contact", href: "/contact", body: "General enquiry form; Vistrow typically replies within one business day." },
  { label: "Blog", href: "/blog", body: "Practical articles on connected marketing, CRM, AI voice, and automation." },
  { label: "About", href: "/about", body: "Who Vistrow is and what the team does." },
  { label: "Our Approach", href: "/approach", body: "How Vistrow scopes and delivers engagements." },
  { label: "Careers", href: "/careers", body: "Open roles at Vistrow." },
  { label: "Partners", href: "/partners", body: "Vistrow's partner programme." },
];

export function buildChatKnowledge(): string {
  const lines: string[] = [];

  lines.push(`Company: ${siteName} Technologies`);
  lines.push(`Website: ${siteUrl}`);
  lines.push(String(organizationSchema.description ?? ""));
  const areaServed = organizationSchema.areaServed;
  if (Array.isArray(areaServed)) lines.push(`Areas served: ${areaServed.join(", ")}`);
  if (organizationSchema.email) lines.push(`Contact email: ${organizationSchema.email}`);
  lines.push(`Contact phone / WhatsApp: ${businessPhone}`);
  lines.push("Based in Baner, Pune, Maharashtra 411045, India.");
  lines.push("");

  for (const group of overviewGroups) {
    lines.push(`${group.heading}:`);
    for (const card of group.overview.cards) {
      lines.push(`- ${card.label} (${card.href}): ${card.body}`);
    }
    lines.push("");
  }

  lines.push("PRODUCT LIVE URLS (external, use only when asked to try/use a product directly):");
  for (const product of Object.values(products)) {
    if (product.externalUrl) {
      lines.push(`- ${product.name}: ${product.externalUrl}`);
    }
  }
  lines.push("");

  lines.push("OTHER KEY PAGES:");
  for (const page of evergreenPages) {
    lines.push(`- ${page.label} (${page.href}): ${page.body}`);
  }
  lines.push("");

  lines.push(
    "PRICING POLICY: Vistrow does not publish fixed prices. Every engagement is scoped around the channels, systems, and outcomes needed. Never invent a number - point pricing questions to a Growth Audit or Contact.",
  );

  return lines.join("\n");
}

export const VALID_CHAT_LINKS: Set<string> = (() => {
  const set = new Set<string>(["/"]);
  for (const page of evergreenPages) set.add(page.href);
  for (const group of overviewGroups) {
    for (const card of group.overview.cards) set.add(card.href);
  }
  for (const product of Object.values(products)) {
    if (product.externalUrl) set.add(product.externalUrl);
  }
  return set;
})();
