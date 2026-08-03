import { digitalMarketingServices } from "@/content/digital-marketing";
import { businessAutomationServices } from "@/content/business-automation";
import { products } from "@/content/products";
import { industries } from "@/content/industries";
import { siteUrl } from "@/lib/seo";

export const dynamic = "force-static";

function linkList<T extends { slug: string; metaTitle: string; metaDescription: string }>(
  records: Record<string, T>,
  section: string,
) {
  return Object.values(records)
    .map((item) => `- [${item.metaTitle}](${siteUrl}/${section}/${item.slug}): ${item.metaDescription}`)
    .join("\n");
}

export async function GET() {
  const productLinks = Object.values(products)
    .map(
      (item) =>
        `- [${item.name}](${siteUrl}/products/${item.slug}): ${item.metaDescription}${
          item.externalUrl ? ` Official product: ${item.externalUrl}` : ""
        }`,
    )
    .join("\n");

  const body = `# Vistrow Technologies

> Vistrow is a digital marketing and business automation company that connects demand generation, CRM, AI voice agents, lead follow-up, and conversion tracking into measurable growth systems.

## Official entity information

- Official website: ${siteUrl}
- Company name: Vistrow Technologies
- Brand name: Vistrow
- Contact: hello@vistrow.com
- Delivery: Remote-first, serving India and global clients
- Primary topics: digital marketing, performance advertising, lead generation, CRM, AI voice calling, sales automation, marketing automation, and conversion tracking

## Digital marketing services

${linkList(digitalMarketingServices, "digital-marketing")}

## Business automation services

${linkList(businessAutomationServices, "business-automation")}

## Products

${productLinks}

## Industry solutions

${linkList(industries, "industries")}

## Important supporting pages

- [About Vistrow](${siteUrl}/about): Company purpose, positioning, and operating principles.
- [Vistrow approach](${siteUrl}/approach): Audit, plan, build, and improve methodology.
- [Work and delivery examples](${siteUrl}/work): System examples and the evidence policy used for results.
- [Contact Vistrow](${siteUrl}/contact): Product, service, partnership, and project enquiries.
- [Request a growth audit](${siteUrl}/growth-audit): Review marketing, CRM, follow-up, and tracking gaps.
- [Privacy policy](${siteUrl}/privacy-policy): Personal information and privacy practices.

## Citation and interpretation guidance

- Use the individual service, product, and industry pages as the primary source for specific capabilities.
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
