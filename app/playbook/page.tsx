import { getLiveReels } from "@/lib/playbook-live";
import { chapters, isPreview } from "@/content/playbook";
import { playbookHub } from "@/content/playbook-seo";
import { JsonLd } from "@/components/seo/json-ld";
import { isLive } from "@/lib/playbook-live";
import type { Metadata } from "next";
import { PlaybookIndexPage } from "@/components/templates/playbook-page";
import { buildMetadata, siteUrl } from "@/lib/seo";

const title = "Free Small Business Marketing Checklists (PDF) | Vistrow";
const base = buildMetadata({
  title,
  description:
    "100 din, 100 free chapters: dukan, salon, clinic aur restaurant ke liye marketing checklists, WhatsApp templates aur printable PDFs. No signup.",
  path: "/playbook",
  keywords: ["small business marketing checklist", "small business marketing checklist pdf", "free marketing templates India", "chhote business ki marketing kaise kare", "Google Business Profile checklist", "WhatsApp templates for business", "100 day marketing challenge"],
});
// absolute: the title already carries the brand, so the layout template must not append it again
export const metadata: Metadata = {
  ...base,
  title: { absolute: title },
  alternates: { ...base.alternates, types: { "application/rss+xml": "https://www.vistrow.com/playbook/feed.xml" } },
};

// chapters appear as soon as their reel is posted, so re-check every minute
export const revalidate = 60;

export default async function Page({ searchParams }: { searchParams?: { preview?: string } }) {
  const live = await getLiveReels();
  const released = chapters.filter((c) => isLive(c, live));
  const url = `${siteUrl}/playbook`;
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "BreadcrumbList", itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
              { "@type": "ListItem", position: 2, name: "100 Din Playbook", item: url },
            ] },
            {
              "@type": "CollectionPage", "@id": `${url}#collection`, name: "100 Din Playbook", url, description: playbookHub.answer,
              inLanguage: "hi-Latn-IN", isAccessibleForFree: true, publisher: { "@id": `${siteUrl}/#organization` }, isPartOf: { "@id": `${siteUrl}/#website` },
              mainEntity: { "@type": "ItemList", numberOfItems: released.length, itemListElement: released.map((c) => ({ "@type": "ListItem", position: c.day, name: c.title, url: `${url}/${c.slug}` })) },
            },
            { "@type": "FAQPage", "@id": `${url}#faq`, mainEntity: playbookHub.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
          ],
        }}
      />
      <PlaybookIndexPage preview={isPreview(searchParams?.preview)} live={live} />
    </>
  );
}
