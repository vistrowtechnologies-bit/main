import type { Metadata } from "next";
import { OverviewPage } from "@/components/templates/overview-page";
import { MarketGuides } from "@/components/sections/market-guides";
import { usOverview } from "@/content/market-pages";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: usOverview.metaTitle,
  description: usOverview.metaDescription,
  path: "/us",
});

// Refresh every few minutes so new guides appear without a redeploy.
export const revalidate = 300;

export default function Page() {
  return <OverviewPage content={usOverview} parent={{ label: "United States", href: "/us" }} extra={<MarketGuides market="US" label="US businesses" />} />;
}
