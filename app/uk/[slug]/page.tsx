import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndustryPage } from "@/components/templates/industry-page";
import { marketPages } from "@/content/market-pages";
import { buildMetadata } from "@/lib/seo";

// UK versions of the industry pages. Static pages in this folder (for example /us/roofing) take precedence.
export function generateStaticParams() {
  return Object.keys(marketPages.uk).map((slug) => ({ slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = marketPages.uk[params.slug];
  if (!c) return {};
  return buildMetadata({ title: c.metaTitle, description: c.metaDescription, path: c.path!, hreflang: c.hreflang });
}

export default function Page({ params }: { params: { slug: string } }) {
  const content = marketPages.uk[params.slug];
  if (!content) notFound();
  return <IndustryPage content={content} />;
}
