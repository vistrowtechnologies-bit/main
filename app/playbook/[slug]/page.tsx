import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { PlaybookChapterPage } from "@/components/templates/playbook-page";
import { chapters, isPreview, type PlaybookChapter } from "@/content/playbook";
import { playbookSeo } from "@/content/playbook-seo";
import pdfs from "@/content/playbook-pdfs.json";
import { getLiveReels, isLive } from "@/lib/playbook-live";
import { buildMetadata, siteUrl } from "@/lib/seo";

const reelImage = (c: PlaybookChapter) => {
  const m = (pdfs as Record<string, { reel?: string }>)[String(c.day)];
  return m?.reel ? `${siteUrl}${m.reel}` : undefined;
};

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
    keywords: playbookSeo[c.slug]?.keywords,
    openGraph: reelImage(c) ? { image: { url: reelImage(c)!, width: 540, height: 960, alt: `Day ${c.day}: ${c.title}` } } : undefined,
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
  const seo = playbookSeo[c.slug];
  const published = live?.[c.day]?.publishedAt ?? `${c.release}:00+05:30`;
  const reelLink = live?.[c.day]?.reel;
  const pdf = (pdfs as Record<string, { file: string }>)[String(c.day)];
  // HowTo steps come from the chapter's own checklist / steps
  const steps: [string, string][] = c.blocks.flatMap((b) => (b.type === "steps" || b.type === "check" ? b.items : []));
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
            {
              "@type": "Article", "@id": `${url}#article`, headline: c.seoTitle, alternativeHeadline: c.title, description: c.description,
              inLanguage: "hi-Latn-IN", datePublished: published, dateModified: published, mainEntityOfPage: url,
              image: reelImage(c), keywords: seo?.keywords?.join(", "), abstract: seo?.answer,
              author: { "@id": `${siteUrl}/#organization` }, publisher: { "@id": `${siteUrl}/#organization` },
              isPartOf: { "@type": "CreativeWorkSeries", name: "100 Din Playbook", url: `${siteUrl}/playbook` },
              isAccessibleForFree: true, position: c.day,
              ...(pdf ? { associatedMedia: { "@type": "MediaObject", name: `Day ${c.day} printable PDF`, encodingFormat: "application/pdf", contentUrl: `${siteUrl}${pdf.file}` } } : {}),
            },
            ...(steps.length ? [{
              "@type": "HowTo", "@id": `${url}#howto`, name: seo?.question ?? c.title, description: seo?.answer ?? c.description, totalTime: seo?.time,
              image: reelImage(c), estimatedCost: { "@type": "MonetaryAmount", currency: "INR", value: "0" },
              step: steps.map(([name, text], i) => ({ "@type": "HowToStep", position: i + 1, name, text: text || name })),
            }] : []),
            ...(seo ? [{
              "@type": "FAQPage", "@id": `${url}#faq`,
              mainEntity: [[seo.question, seo.answer] as [string, string], ...seo.faq].map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
            }] : []),
            ...(reelLink && live?.[c.day] ? [{
              "@type": "VideoObject", name: `Day ${c.day}/100: ${c.title}`, description: c.description, thumbnailUrl: reelImage(c),
              uploadDate: live[c.day].publishedAt, url: reelLink, embedUrl: reelLink, inLanguage: "hi-IN",
              publisher: { "@id": `${siteUrl}/#organization` },
            }] : []),
          ],
        }}
      />
      <PlaybookChapterPage chapter={c} preview={preview} live={live} />
    </>
  );
}
