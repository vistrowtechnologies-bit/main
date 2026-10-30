import type { Metadata } from "next";
import type { BlogSeoImage } from "@/lib/content-types";

export const siteUrl = "https://www.vistrow.com";
export const siteName = "Vistrow";

type SeoMetadata = {
  title: string;
  description: string;
  path: string;
  canonicalUrl?: string;
  /** Regional equivalents of this page (hreflang code -> path). Include this page itself. */
  hreflang?: Record<string, string>;
  keywords?: string[];
  openGraph?: {
    title?: string;
    description?: string;
    image?: BlogSeoImage;
  };
  twitter?: {
    title?: string;
    description?: string;
    image?: BlogSeoImage;
    card?: "summary" | "summary_large_image";
  };
  robots?: {
    index?: boolean;
    follow?: boolean;
    noarchive?: boolean;
    noimageindex?: boolean;
    nosnippet?: boolean;
    maxSnippet?: number;
    maxVideoPreview?: number;
    maxImagePreview?: "none" | "standard" | "large";
  };
  article?: {
    publishedTime: string;
    modifiedTime?: string;
    section?: string;
  };
};

export function buildMetadata({
  title,
  description,
  path,
  canonicalUrl,
  hreflang,
  keywords,
  openGraph,
  twitter,
  robots,
  article,
}: SeoMetadata): Metadata {
  const canonical = canonicalUrl || (path === "/" ? siteUrl : `${siteUrl}${path}`);
  const defaultImage: BlogSeoImage = {
    url: `${siteUrl}/og-vistrow-v2.png`,
    width: 1200,
    height: 630,
    alt: "Vistrow Technologies: Digital marketing. Connected systems. Measurable growth.",
  };
  const openGraphImage = openGraph?.image || defaultImage;
  const twitterImage = twitter?.image || openGraphImage;
  const index = robots?.index ?? true;
  const follow = robots?.follow ?? true;
  const openGraphMetadata: Metadata["openGraph"] = article
    ? {
        type: "article",
        siteName,
        url: canonical,
        title: openGraph?.title || title,
        description: openGraph?.description || description,
        publishedTime: article.publishedTime,
        modifiedTime: article.modifiedTime || article.publishedTime,
        section: article.section,
        tags: keywords,
        images: [openGraphImage],
      }
    : {
        type: "website",
        siteName,
        url: canonical,
        title: openGraph?.title || title,
        description: openGraph?.description || description,
        images: [openGraphImage],
      };

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
      ...(hreflang && {
        languages: Object.fromEntries(
          [...Object.entries(hreflang), ["x-default", Object.values(hreflang)[0]] as [string, string]].map(([code, path]) => [code, `${siteUrl}${path}`]),
        ),
      }),
    },
    openGraph: openGraphMetadata,
    twitter: {
      card: twitter?.card || "summary_large_image",
      title: twitter?.title || openGraph?.title || title,
      description: twitter?.description || openGraph?.description || description,
      images: [twitterImage],
    },
    robots: {
      index,
      follow,
      noarchive: robots?.noarchive ?? false,
      noimageindex: robots?.noimageindex ?? false,
      nosnippet: robots?.nosnippet ?? false,
      googleBot: {
        index,
        follow,
        noarchive: robots?.noarchive ?? false,
        noimageindex: robots?.noimageindex ?? false,
        nosnippet: robots?.nosnippet ?? false,
        "max-image-preview": robots?.maxImagePreview ?? "large",
        "max-snippet": robots?.maxSnippet ?? -1,
        "max-video-preview": robots?.maxVideoPreview ?? -1,
      },
    },
  };
}
