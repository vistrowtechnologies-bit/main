import type { Metadata } from "next";
import { LegalPage } from "@/components/templates/legal-page";
import { legalPages } from "@/content/legal";

const content = legalPages["privacy-policy"];
export const metadata: Metadata = {
  title: content.title,
  description: "How Vistrow Technologies collects, uses, and protects your personal information.",
};

export default function Page() {
  return <LegalPage content={content} />;
}
