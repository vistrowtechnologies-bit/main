import type { Metadata } from "next";
import { OverviewPage } from "@/components/templates/overview-page";
import { ukOverview } from "@/content/market-pages";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: ukOverview.metaTitle,
  description: ukOverview.metaDescription,
  path: "/uk",
});

export default function Page() {
  return <OverviewPage content={ukOverview} parent={{ label: "United Kingdom", href: "/uk" }} />;
}
