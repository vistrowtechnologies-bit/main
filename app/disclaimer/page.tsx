import type { Metadata } from "next";
import { LegalPage } from "@/components/templates/legal-page";
import { legalPages } from "@/content/legal";
import { buildMetadata } from "@/lib/seo";

const content = legalPages["disclaimer"];
export const metadata: Metadata = buildMetadata({
  title: content.title,
  description: "General disclaimer for the Vistrow Technologies website and services.",
  path: "/disclaimer",
});

export default function Page() {
  return <LegalPage content={content} />;
}
