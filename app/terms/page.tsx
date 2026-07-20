import type { Metadata } from "next";
import { LegalPage } from "@/components/templates/legal-page";
import { legalPages } from "@/content/legal";

const content = legalPages["terms"];
export const metadata: Metadata = {
  title: content.title,
  description: "The terms and conditions governing use of the Vistrow Technologies website and services.",
};

export default function Page() {
  return <LegalPage content={content} />;
}
