import { getLiveReels } from "@/lib/playbook-live";
import { isPreview } from "@/content/playbook";
import type { Metadata } from "next";
import { PlaybookIndexPage } from "@/components/templates/playbook-page";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "100 Din Playbook: Free Small Business Marketing Checklists & Templates",
  description:
    "Free checklists, WhatsApp templates and trackers for Indian small businesses. One new chapter unlocks with every reel of the Vistrow 100-day challenge.",
  path: "/playbook",
});

// chapters appear as soon as their reel is posted, so re-check every minute
export const revalidate = 60;

export default async function Page({ searchParams }: { searchParams?: { preview?: string } }) {
  return <PlaybookIndexPage preview={isPreview(searchParams?.preview)} live={await getLiveReels()} />;
}
