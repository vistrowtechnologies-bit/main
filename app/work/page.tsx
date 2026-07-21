import type { Metadata } from "next";
import { OverviewPage } from "@/components/templates/overview-page";
import { workOverview } from "@/content/work";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: workOverview.metaTitle,
  description: workOverview.metaDescription,
  path: "/work",
});

export default function Page() {
  return <OverviewPage content={workOverview} parent={{ label: "Work", href: "/work" }} />;
}
