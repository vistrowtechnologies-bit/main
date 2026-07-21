import type { Metadata } from "next";
import { OverviewPage } from "@/components/templates/overview-page";
import { industriesOverview } from "@/content/industries";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: industriesOverview.metaTitle,
  description: industriesOverview.metaDescription,
  path: "/industries",
});

export default function Page() {
  return (
    <OverviewPage content={industriesOverview} parent={{ label: "Industries", href: "/industries" }} />
  );
}
