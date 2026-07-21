import type { Metadata } from "next";
import { OverviewPage } from "@/components/templates/overview-page";
import { businessAutomationOverview } from "@/content/business-automation";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: businessAutomationOverview.metaTitle,
  description: businessAutomationOverview.metaDescription,
  path: "/business-automation",
});

export default function Page() {
  return (
    <OverviewPage
      content={businessAutomationOverview}
      parent={{ label: "Business Automation", href: "/business-automation" }}
    />
  );
}
