import type { Metadata } from "next";
import { LegalPage } from "@/components/templates/legal-page";
import { legalPages } from "@/content/legal";
import { buildMetadata } from "@/lib/seo";

const content = legalPages["cookie-policy"];
export const metadata: Metadata = buildMetadata({
  title: content.title,
  description: "How Vistrow Technologies uses cookies and similar technologies.",
  path: "/cookie-policy",
});

export default function Page() {
  return <LegalPage content={content} />;
}
