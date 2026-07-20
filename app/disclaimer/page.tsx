import type { Metadata } from "next";
import { LegalPage } from "@/components/templates/legal-page";
import { legalPages } from "@/content/legal";

const content = legalPages["disclaimer"];
export const metadata: Metadata = {
  title: content.title,
  description: "General disclaimer for the Vistrow Technologies website and services.",
};

export default function Page() {
  return <LegalPage content={content} />;
}
