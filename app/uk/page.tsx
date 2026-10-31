import type { Metadata } from "next";
import { OverviewPage } from "@/components/templates/overview-page";
import { MarketGuides } from "@/components/sections/market-guides";
import { ukOverview } from "@/content/market-pages";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: ukOverview.metaTitle,
  description: ukOverview.metaDescription,
  path: "/uk",
});

// Refresh every few minutes so new guides appear without a redeploy.
export const revalidate = 300;

export default function Page() {
  return <OverviewPage content={ukOverview} parent={{ label: "United Kingdom", href: "/uk" }} extra={<MarketGuides market="UK" label="UK businesses" />} />;
}
