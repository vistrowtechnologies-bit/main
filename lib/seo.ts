import type { Metadata } from "next";

export const siteUrl = "https://vistrow.com";
export const siteName = "Vistrow";

type SeoMetadata = {
  title: string;
  description: string;
  path: string;
};

export function buildMetadata({ title, description, path }: SeoMetadata): Metadata {
  const canonical = path === "/" ? siteUrl : `${siteUrl}${path}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      siteName,
      url: canonical,
      title,
      description,
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: "Vistrow connected marketing and business automation",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}
