import type { Metadata } from "next";
import { OverviewPage } from "@/components/templates/overview-page";
import { industriesOverview } from "@/content/industries";

export const metadata: Metadata = {
  title: industriesOverview.metaTitle,
  description: industriesOverview.metaDescription,
};

export default function Page() {
  return (
    <OverviewPage content={industriesOverview} parent={{ label: "Industries", href: "/industries" }} />
  );
}
