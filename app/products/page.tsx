import type { Metadata } from "next";
import { OverviewPage } from "@/components/templates/overview-page";
import { productsOverview } from "@/content/products";

export const metadata: Metadata = {
  title: productsOverview.metaTitle,
  description: productsOverview.metaDescription,
};

export default function Page() {
  return (
    <OverviewPage content={productsOverview} parent={{ label: "Products", href: "/products" }} />
  );
}
