import type { Metadata } from "next";
import { OverviewPage } from "@/components/templates/overview-page";
import { digitalMarketingOverview } from "@/content/digital-marketing";

export const metadata: Metadata = {
  title: digitalMarketingOverview.metaTitle,
  description: digitalMarketingOverview.metaDescription,
};

export default function Page() {
  return (
    <OverviewPage
      content={digitalMarketingOverview}
      parent={{ label: "Digital Marketing", href: "/digital-marketing" }}
    />
  );
}
