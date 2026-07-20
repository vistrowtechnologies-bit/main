import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPage } from "@/components/templates/product-page";
import { ProductPreview } from "@/components/sections/product-preview";
import { products } from "@/content/products";

export function generateStaticParams() {
  return Object.keys(products).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = products[params.slug];
  if (!c) return {};
  return { title: c.metaTitle, description: c.metaDescription };
}

export default function Page({ params }: { params: { slug: string } }) {
  const content = products[params.slug];
  if (!content) notFound();
  return (
    <ProductPage
      content={content}
      preview={
        <ProductPreview
          name={content.name}
          tagline={content.tagline}
          stats={content.preview?.stats}
          rows={content.preview?.rows}
        />
      }
    />
  );
}
