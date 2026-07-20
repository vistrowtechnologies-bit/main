import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndustryPage } from "@/components/templates/industry-page";
import { industries } from "@/content/industries";

export function generateStaticParams() {
  return Object.keys(industries).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = industries[params.slug];
  if (!c) return {};
  return { title: c.metaTitle, description: c.metaDescription };
}

export default function Page({ params }: { params: { slug: string } }) {
  const content = industries[params.slug];
  if (!content) notFound();
  return <IndustryPage content={content} />;
}
