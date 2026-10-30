import type { Metadata } from "next";
import { OverviewPage } from "@/components/templates/overview-page";
import { usOverview } from "@/content/market-pages";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: usOverview.metaTitle,
  description: usOverview.metaDescription,
  path: "/us",
});

export default function Page() {
  return <OverviewPage content={usOverview} parent={{ label: "United States", href: "/us" }} />;
}
