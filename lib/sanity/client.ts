import { createClient } from "@sanity/client";
import {
  sanityApiVersion,
  sanityDataset,
  sanityProjectId,
} from "@/lib/sanity/config";

export const sanityClient = createClient({
  projectId: sanityProjectId,
  dataset: sanityDataset,
  apiVersion: sanityApiVersion,
  useCdn: process.env.NODE_ENV === "production",
  perspective: "published",
});
