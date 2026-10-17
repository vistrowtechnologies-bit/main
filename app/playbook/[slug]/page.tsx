import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { PlaybookChapterPage } from "@/components/templates/playbook-page";
import { chapters, isPreview } from "@/content/playbook";
import { getLiveReels, isLive } from "@/lib/playbook-live";
import { buildMetadata, siteUrl } from "@/lib/seo";

// a chapter appears once its reel is posted, so re-check every minute
export const revalidate = 60;

export function generateStaticParams() {
  return chapters.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = chapters.find((x) => x.slug === params.slug);
  if (!c) return {};
  const metadata = buildMetadata({
    title: c.seoTitle,
    description: c.description,
    path: `/playbook/${c.slug}`,
    article: { publishedTime: `${c.release}:00+05:30`, section: "100 Din Playbook" },
  });
  metadata.title = { absolute: c.seoTitle };
  return metadata;
}

export default async function Page({ params, searchParams }: { params: { slug: string }; searchParams?: { preview?: string } }) {
  const c = chapters.find((x) => x.slug === params.slug);
  const preview = isPreview(searchParams?.preview);
  // a chapter does not exist publicly until its reel is posted
  const live = await getLiveReels();
  if (!c || (!isLive(c, live) && !preview)) notFound();
  const url = `${siteUrl}/playbook/${c.slug}`;
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "BreadcrumbList", itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
              { "@type": "ListItem", position: 2, name: "100 Din Playbook", item: `${siteUrl}/playbook` },
              { "@type": "ListItem", position: 3, name: c.title, item: url },
            ] },
            { "@type": "Article", headline: c.seoTitle, description: c.description, inLanguage: "hi-IN", datePublished: `${c.release}:00+05:30`,
              mainEntityOfPage: url, author: { "@type": "Organization", name: "Vistrow Technologies", url: siteUrl },
              publisher: { "@type": "Organization", name: "Vistrow Technologies", url: siteUrl } },
          ],
        }}
      />
      <PlaybookChapterPage chapter={c} preview={preview} live={live} />
    </>
  );
}
