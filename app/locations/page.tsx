import type { Metadata } from "next";
import { OverviewPage } from "@/components/templates/overview-page";
import { locationsOverview } from "@/content/locations";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: locationsOverview.metaTitle,
  description: locationsOverview.metaDescription,
  path: "/locations",
});

export default function Page() {
  return (
    <OverviewPage content={locationsOverview} parent={{ label: "Locations", href: "/locations" }} />
  );
}
