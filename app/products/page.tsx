import type { Metadata } from "next";
import { OverviewPage } from "@/components/templates/overview-page";
import { productsOverview } from "@/content/products";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: productsOverview.metaTitle,
  description: productsOverview.metaDescription,
  path: "/products",
});

export default function Page() {
  return (
    <OverviewPage content={productsOverview} parent={{ label: "Products", href: "/products" }} />
  );
}
