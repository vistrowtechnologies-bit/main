import sitemap from "@/app/sitemap";
import { siteUrl } from "@/lib/seo";
import { getSanityWriteClient } from "@/lib/sanity/write-client";
import { submitSitemap } from "@/lib/seo-report/search-console";
import { submitToIndexNow } from "@/lib/indexing/indexnow";
import { getBlogPosts } from "@/lib/sanity/blog";

const STATE_ID = "indexingState";

type IndexingState = { lastDeploymentId?: string; lastRunAt?: string };

// Tells search engines about changes since the last run:
// - a new deployment (code or page content changed) -> every sitemap URL
// - otherwise -> only blog posts modified since the last run
// IndexNow covers Bing and others; Google gets the sitemap resubmitted through Search Console.
export async function notifySearchEngines(log: string[]): Promise<void> {
  const writeClient = getSanityWriteClient();
  const state: IndexingState = (await writeClient.getDocument<IndexingState & { _id: string }>(STATE_ID)) ?? {};
  const deploymentId = process.env.VERCEL_DEPLOYMENT_ID || process.env.VERCEL_GIT_COMMIT_SHA || "local";
  const lastRunAt = state.lastRunAt ? new Date(state.lastRunAt) : undefined;

  const entries = await sitemap();
  const isNewDeployment = deploymentId !== state.lastDeploymentId;
  // Scheduled posts are created days before they go live, so also count posts whose publication
  // date is on or after the last run's date.
  const sinceDay = lastRunAt?.toISOString().slice(0, 10);
  const wentLive = sinceDay
    ? new Set((await getBlogPosts()).filter((post) => post.date && post.date.slice(0, 10) >= sinceDay).map((post) => `${siteUrl}/blog/${post.slug}`))
    : new Set<string>();
  const changed = isNewDeployment
    ? entries.map((entry) => entry.url)
    : entries
        .filter((entry) => wentLive.has(entry.url) || (entry.lastModified && lastRunAt && new Date(entry.lastModified) > lastRunAt))
        .map((entry) => entry.url);

  log.push(isNewDeployment ? `New deployment ${deploymentId}: submitting all ${changed.length} URLs.` : `${changed.length} blog post(s) changed since the last run.`);

  if (changed.length > 0) {
    try {
      log.push(await submitToIndexNow(changed));
    } catch (error) {
      log.push(`IndexNow failed: ${String(error)}`);
    }

    if (process.env.GSC_SERVICE_ACCOUNT_JSON) {
      try {
        const property = process.env.GSC_SITE_URL || `${siteUrl}/`;
        await submitSitemap(property, `${siteUrl}/sitemap.xml`);
        await submitSitemap(property, `${siteUrl}/image-sitemap.xml`);
        log.push("Google: sitemap and image sitemap resubmitted in Search Console.");
      } catch (error) {
        log.push(`Google sitemap resubmit failed: ${String(error)}`);
      }
    } else {
      log.push("Google: skipped, GSC_SERVICE_ACCOUNT_JSON is not configured.");
    }
  }

  await writeClient.createOrReplace({ _id: STATE_ID, _type: "indexingState", lastDeploymentId: deploymentId, lastRunAt: new Date().toISOString() });
}
