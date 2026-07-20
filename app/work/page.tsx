import type { Metadata } from "next";
import { OverviewPage } from "@/components/templates/overview-page";
import { workOverview } from "@/content/work";

export const metadata: Metadata = {
  title: workOverview.metaTitle,
  description: workOverview.metaDescription,
};

export default function Page() {
  return <OverviewPage content={workOverview} parent={{ label: "Work", href: "/work" }} />;
}
