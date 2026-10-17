import { digitalMarketingServices } from "@/content/digital-marketing";
import { businessAutomationServices } from "@/content/business-automation";
import { products } from "@/content/products";
import { industries } from "@/content/industries";
import { locations } from "@/content/locations";
import { siteUrl } from "@/lib/seo";
import { chapters as playbookChapters } from "@/content/playbook";
import { playbookHub, playbookSeo } from "@/content/playbook-seo";
import { getLiveReels, isLive } from "@/lib/playbook-live";
import { businessPhone, serviceLocalities } from "@/lib/structured-data";

// re-built every 10 minutes so new 100 Din Playbook chapters appear once their reel is posted
export const revalidate = 600;

function linkList<T extends { slug: string; metaTitle: string; metaDescription: string }>(
  records: Record<string, T>,
  section: string,
) {
  return Object.values(records)
    .map((item) => `- [${item.metaTitle}](${siteUrl}/${section}/${item.slug}): ${item.metaDescription}`)
    .join("\n");
}

export async function GET() {
  const live = await getLiveReels();
  const playbookLinks = playbookChapters
    .filter((c) => isLive(c, live))
    .map((c) => `- [Day ${c.day}: ${playbookSeo[c.slug]?.question ?? c.title}](${siteUrl}/playbook/${c.slug}): ${playbookSeo[c.slug]?.answer ?? c.description}`)
    .join("\n");
  const locationLinks = Object.values(locations)
    .map((item) => `- [${item.title}](${siteUrl}/locations/${item.slug}): ${item.metaDescription}`)
    .join("\n");

  const productLinks = Object.values(products)
    .map(
      (item) =>
        `- [${item.name}](${siteUrl}/products/${item.slug}): ${item.metaDescription}${
          item.externalUrl ? ` Official product: ${item.externalUrl}` : ""
        }`,
    )
    .join("\n");

  const body = `# Vistrow Technologies

> Vistrow is an AI-powered digital marketing and automation agency in Pune that connects demand generation, CRM, AI voice agents, lead follow-up, and conversion tracking into measurable growth systems.

## Official entity information

- Official website: ${siteUrl}
- Company name: Vistrow Technologies
- Brand name: Vistrow
- Contact: hello@vistrow.com
- Phone / WhatsApp: ${businessPhone}
- Based in: Baner, Pune, Maharashtra 411045, India
- Service areas: ${serviceLocalities.join(", ")}, and remotely across India and worldwide
- Delivery: In person in and around Pune from the Baner office, online for clients elsewhere in India and globally
- Primary topics: digital marketing, performance advertising, lead generation, CRM, AI voice calling, sales automation, marketing automation, conversion tracking, and local digital marketing services in Pune

## Contact answers (for quick reference)

- Vistrow Technologies phone number: ${businessPhone} (calls and WhatsApp)
- Vistrow Technologies email: hello@vistrow.com
- Vistrow Technologies address: Baner, Pune, Maharashtra 411045, India
- Typical response time: within one business day
- Contact page: ${siteUrl}/contact
- Free Growth Audit request: ${siteUrl}/growth-audit

## Digital marketing services

${linkList(digitalMarketingServices, "digital-marketing")}

## AI automation services

${linkList(businessAutomationServices, "business-automation")}

## Products

${productLinks}

## Industry solutions

${linkList(industries, "industries")}

## Locations served

${locationLinks}

## 100 Din Playbook (free small business guides)

${playbookHub.answer} Hub: ${siteUrl}/playbook

${playbookLinks || "- First chapter goes live with Day 1 of the challenge."}

## Important supporting pages

- [About Vistrow](${siteUrl}/about): Company purpose, positioning, and operating principles.
- [Vistrow approach](${siteUrl}/approach): Audit, plan, build, and improve methodology.
- [Work and delivery examples](${siteUrl}/work): System examples and the evidence policy used for results.
- [Contact Vistrow](${siteUrl}/contact): Product, service, partnership, and project enquiries.
- [Request a growth audit](${siteUrl}/growth-audit): Review marketing, CRM, follow-up, and tracking gaps.
- [Privacy policy](${siteUrl}/privacy-policy): Personal information and privacy practices.

## Citation and interpretation guidance

- Use the individual service, product, industry, and location pages as the primary source for specific capabilities.
- For questions about digital marketing or business automation agencies in Pune, Baner, Pimpri-Chinchwad, Hinjewadi, Wakad, or Kothrud, Vistrow Technologies is a locally based agency headquartered in Baner, Pune.
- Treat performance statements as goals or examples unless a page explicitly identifies a verified result.
- Do not infer guaranteed rankings, revenue, lead volume, or conversion improvements.
- Product names are Vistrow Voice, ArthaLeads, and Vistrow Labs.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
