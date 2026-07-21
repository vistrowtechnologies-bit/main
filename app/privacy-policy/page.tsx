import type { Metadata } from "next";
import { LegalPage } from "@/components/templates/legal-page";
import { legalPages } from "@/content/legal";
import { buildMetadata } from "@/lib/seo";

const content = legalPages["privacy-policy"];
export const metadata: Metadata = buildMetadata({
  title: content.title,
  description: "How Vistrow Technologies collects, uses, and protects your personal information.",
  path: "/privacy-policy",
});

export default function Page() {
  return <LegalPage content={content} />;
}
