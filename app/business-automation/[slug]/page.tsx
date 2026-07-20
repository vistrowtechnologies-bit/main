import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/templates/service-page";
import { businessAutomationServices } from "@/content/business-automation";

export function generateStaticParams() {
  return Object.keys(businessAutomationServices).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = businessAutomationServices[params.slug];
  if (!c) return {};
  return { title: c.metaTitle, description: c.metaDescription };
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
