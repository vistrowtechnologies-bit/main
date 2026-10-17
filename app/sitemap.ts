import type { MetadataRoute } from "next";
import { digitalMarketingServices } from "@/content/digital-marketing";
import { businessAutomationServices } from "@/content/business-automation";
import { products } from "@/content/products";
import { industries } from "@/content/industries";
import { locations } from "@/content/locations";
import { workPages } from "@/content/work";
import { siteUrl } from "@/lib/seo";
import { chapters as playbookChapters } from "@/content/playbook";
import { getLiveReels, isLive } from "@/lib/playbook-live";
import { getBlogPosts } from "@/lib/sanity/blog";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const live = await getLiveReels();
  const blogPosts = await getBlogPosts();
  const staticRoutes = [
    "",
    "/services",
    "/digital-marketing",
    "/business-automation",
    "/products",
    "/industries",
    "/locations",
    "/work",
    "/work/website-portfolio",
    "/blog",
    "/playbook",
    "/about",
    "/approach",
    "/careers",
    "/partners",
    "/contact",
    "/growth-audit",
    "/us/roofing",
    "/privacy-policy",
    "/terms",
    "/cookie-policy",
    "/disclaimer",
  ];

  const dynamicRoutes = [
    ...Object.keys(digitalMarketingServices).map((s) => `/digital-marketing/${s}`),
    ...Object.keys(businessAutomationServices).map((s) => `/business-automation/${s}`),
    ...Object.keys(products).map((s) => `/products/${s}`),
    ...Object.keys(industries).map((s) => `/industries/${s}`),
    ...Object.keys(locations).map((s) => `/locations/${s}`),
    ...Object.keys(workPages).map((s) => `/work/${s}`),
    ...blogPosts
      .filter((post) => !post.excludeFromSitemap && post.robotsIndex !== false && !post.redirectUrl)
      .map((post) => `/blog/${post.slug}`),
    // 100 Din Playbook chapters appear in the sitemap only once they are unlocked (reel released)
    ...playbookChapters.filter((c) => isLive(c, live)).map((c) => `/playbook/${c.slug}`),
  ];

  // Real modification dates for posts, so search engines know which ones changed.
  const postModified = new Map(blogPosts.map((post) => [`/blog/${post.slug}`, post.dateModified || post.date]));

  return [...staticRoutes, ...dynamicRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    ...(postModified.get(route) ? { lastModified: postModified.get(route) } : {}),
    changeFrequency: route.includes("policy") || route === "/terms" || route === "/disclaimer" ? "yearly" : "monthly",
    priority: route === "" ? 1 : route.split("/").length === 2 ? 0.8 : 0.7,
  }));
}
