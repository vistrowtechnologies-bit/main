import { digitalMarketingServices } from "@/content/digital-marketing";
import { businessAutomationServices } from "@/content/business-automation";
import { products } from "@/content/products";
import { industries } from "@/content/industries";
import { locations } from "@/content/locations";
import { ROUTE_IMAGES, type PageImage } from "@/lib/page-images";
import { siteUrl } from "@/lib/seo";

// Google image sitemap: which photos and product screens appear on which page, with their captions.
// Listed in robots.txt next to the main sitemap (Next 14's sitemap.ts cannot carry images).
export const revalidate = 3600;

export function GET() {
  const pages = new Map<string, PageImage[]>(Object.entries(ROUTE_IMAGES));
  const add = (route: string, images: (PageImage | undefined)[]) => {
    const list = images.filter((image): image is PageImage => Boolean(image));
    if (list.length) pages.set(route, [...(pages.get(route) ?? []), ...list]);
  };

  for (const service of Object.values(digitalMarketingServices)) add(`/digital-marketing/${service.slug}`, [service.image]);
  for (const service of Object.values(businessAutomationServices)) add(`/business-automation/${service.slug}`, [service.image]);
  for (const location of Object.values(locations)) add(`/locations/${location.slug}`, [location.image]);
  for (const industry of Object.values(industries)) add(`/industries/${industry.slug}`, [industry.image]);
  for (const product of Object.values(products)) add(`/products/${product.slug}`, product.screenshots ?? []);

  const escape = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const urls = [...pages.entries()]
    .map(
      ([route, images]) => `  <url>
    <loc>${siteUrl}${route}</loc>
${images.map((image) => `    <image:image><image:loc>${siteUrl}${image.src}</image:loc><image:caption>${escape(image.alt)}</image:caption></image:image>`).join("\n")}
  </url>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
