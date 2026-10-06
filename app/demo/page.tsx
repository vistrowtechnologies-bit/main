import type { Metadata } from "next";
import DemoHome from "./demo-home";

export const metadata: Metadata = {
  title: { absolute: "Arth Aspire Institute | Homepage concept" },
  description: "A homepage concept for Arth Aspire Institute, featuring its Brain Booster booklets and Maths Mastery workbooks.",
  alternates: { canonical: "https://www.vistrow.com/demo" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Arth Aspire Institute | Homepage concept",
    description: "Explore a new homepage concept for Arth Aspire Institute and its real learning resources.",
    url: "https://www.vistrow.com/demo",
    type: "website",
    images: [{ url: "/demo/arth-aspire/brain-booster-4.jpg", width: 620, height: 877, alt: "Brain Booster Activity Booklet cover" }],
  },
  twitter: { card: "summary", title: "Arth Aspire Institute | Homepage concept" },
};

export default function DemoPage() {
  return <DemoHome />;
}
