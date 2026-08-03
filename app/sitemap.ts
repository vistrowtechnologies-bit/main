import type { MetadataRoute } from "next";
import { digitalMarketingServices } from "@/content/digital-marketing";
import { businessAutomationServices } from "@/content/business-automation";
import { products } from "@/content/products";
import { industries } from "@/content/industries";
import { workPages } from "@/content/work";
import { siteUrl } from "@/lib/seo";
import { getBlogPosts } from "@/lib/sanity/blog";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await getBlogPosts();
  const staticRoutes = [
    "",
    "/services",
    "/digital-marketing",
    "/business-automation",
    "/products",
    "/industries",
    "/work",
    "/blog",
    "/about",
    "/approach",
    "/careers",
    "/partners",
    "/contact",
    "/growth-audit",
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
    ...Object.keys(workPages).map((s) => `/work/${s}`),
    ...blogPosts
      .filter((post) => !post.excludeFromSitemap && post.robotsIndex !== false && !post.redirectUrl)
      .map((post) => `/blog/${post.slug}`),
  ];

  return [...staticRoutes, ...dynamicRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: route.includes("policy") || route === "/terms" || route === "/disclaimer" ? "yearly" : "monthly",
    priority: route === "" ? 1 : route.split("/").length === 2 ? 0.8 : 0.7,
  }));
}
