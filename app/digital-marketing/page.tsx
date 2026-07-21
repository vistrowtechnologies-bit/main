import type { Metadata } from "next";
import { OverviewPage } from "@/components/templates/overview-page";
import { digitalMarketingOverview } from "@/content/digital-marketing";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: digitalMarketingOverview.metaTitle,
  description: digitalMarketingOverview.metaDescription,
  path: "/digital-marketing",
});

export default function Page() {
  return (
    <OverviewPage
      content={digitalMarketingOverview}
      parent={{ label: "Digital Marketing", href: "/digital-marketing" }}
    />
  );
}
