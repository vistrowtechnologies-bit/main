import type { Metadata } from "next";
import { OverviewPage } from "@/components/templates/overview-page";
import { businessAutomationOverview } from "@/content/business-automation";

export const metadata: Metadata = {
  title: businessAutomationOverview.metaTitle,
  description: businessAutomationOverview.metaDescription,
};

export default function Page() {
  return (
    <OverviewPage
      content={businessAutomationOverview}
      parent={{ label: "Business Automation", href: "/business-automation" }}
    />
  );
}
