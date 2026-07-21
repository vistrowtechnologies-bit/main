import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WorkPage } from "@/components/templates/work-page";
import { workPages } from "@/content/work";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return Object.keys(workPages).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = workPages[params.slug];
  if (!c) return {};
  return buildMetadata({
    title: c.metaTitle,
    description: c.metaDescription,
    path: `/work/${c.slug}`,
  });
}

export default function Page({ params }: { params: { slug: string } }) {
  const content = workPages[params.slug];
  if (!content) notFound();
  return <WorkPage content={content} />;
}
