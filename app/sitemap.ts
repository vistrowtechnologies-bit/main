import type { MetadataRoute } from "next";
import { digitalMarketingServices } from "@/content/digital-marketing";
import { businessAutomationServices } from "@/content/business-automation";
import { products } from "@/content/products";
import { industries } from "@/content/industries";
import { workPages } from "@/content/work";

const base = "https://vistrow.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/digital-marketing",
    "/business-automation",
    "/products",
    "/industries",
    "/work",
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
  ];

  return [...staticRoutes, ...dynamicRoutes].map((route) => ({
    url: `${base}${route}`,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
