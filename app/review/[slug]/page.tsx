import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReviewExperience } from "@/components/review/review-experience";
import { getReviewBusiness } from "@/lib/review-businesses";

type PageProps = { params: { slug: string } };

export function generateMetadata({ params }: PageProps): Metadata {
  const business = getReviewBusiness(params.slug);
  if (!business) return { title: "Review page not found", robots: { index: false, follow: false } };

  return {
    title: `Review ${business.name}`,
    description: `Share your honest experience with ${business.name}.`,
    robots: { index: false, follow: false },
  };
}

export default function ReviewPage({ params }: PageProps) {
  const business = getReviewBusiness(params.slug);
  if (!business) notFound();

  return <ReviewExperience business={business} />;
}
