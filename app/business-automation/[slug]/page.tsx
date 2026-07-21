import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/templates/service-page";
import { businessAutomationServices } from "@/content/business-automation";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return Object.keys(businessAutomationServices).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = businessAutomationServices[params.slug];
  if (!c) return {};
  return buildMetadata({
    title: c.metaTitle,
    description: c.metaDescription,
    path: `/business-automation/${c.slug}`,
  });
}

export default function Page({ params }: { params: { slug: string } }) {
  const content = businessAutomationServices[params.slug];
  if (!content) notFound();
  return (
    <ServicePage
      content={content}
      section={{ label: "Business Automation", href: "/business-automation" }}
    />
  );
}
