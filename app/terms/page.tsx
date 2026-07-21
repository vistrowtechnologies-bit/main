import type { Metadata } from "next";
import { LegalPage } from "@/components/templates/legal-page";
import { legalPages } from "@/content/legal";
import { buildMetadata } from "@/lib/seo";

const content = legalPages["terms"];
export const metadata: Metadata = buildMetadata({
  title: content.title,
  description: "The terms and conditions governing use of the Vistrow Technologies website and services.",
  path: "/terms",
});

export default function Page() {
  return <LegalPage content={content} />;
}
