import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/templates/service-page";
import { digitalMarketingServices } from "@/content/digital-marketing";

export function generateStaticParams() {
  return Object.keys(digitalMarketingServices).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = digitalMarketingServices[params.slug];
  if (!c) return {};
  return { title: c.metaTitle, description: c.metaDescription };
}

export default function Page({ params }: { params: { slug: string } }) {
  const content = digitalMarketingServices[params.slug];
  if (!content) notFound();
  return (
    <ServicePage
      content={content}
      section={{ label: "Digital Marketing", href: "/digital-marketing" }}
    />
  );
}
