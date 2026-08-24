import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocationPage } from "@/components/templates/location-page";
import { locations } from "@/content/locations";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return Object.keys(locations).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = locations[params.slug];
  if (!c) return {};
  return buildMetadata({
    title: c.metaTitle,
    description: c.metaDescription,
    path: `/locations/${c.slug}`,
  });
}

export default function Page({ params }: { params: { slug: string } }) {
  const content = locations[params.slug];
  if (!content) notFound();
  return <LocationPage content={content} />;
}
