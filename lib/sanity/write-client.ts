import { createClient } from "@sanity/client";
import { sanityApiVersion, sanityDataset, sanityProjectId } from "@/lib/sanity/config";

export function getSanityWriteClient() {
  const token = process.env.SANITY_API_TOKEN;
  if (!token) throw new Error("SANITY_API_TOKEN is not configured");

  return createClient({
    projectId: sanityProjectId,
    dataset: sanityDataset,
    apiVersion: sanityApiVersion,
    token,
    useCdn: false,
  });
}
