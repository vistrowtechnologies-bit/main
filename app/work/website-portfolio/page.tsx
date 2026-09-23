import type { Metadata } from "next";
import { PortfolioGallery } from "@/components/templates/portfolio-gallery";
import { websitePortfolio } from "@/content/portfolio";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Website Portfolio",
  description: "See live websites and products designed and built by Vistrow, across real estate, marketing, and manufacturing clients.",
  path: "/work/website-portfolio",
});

export default function Page() {
  return <PortfolioGallery sites={websitePortfolio} />;
}
