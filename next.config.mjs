import { readFileSync } from "node:fs";

// Overlapping blog posts merged into one stronger post each (loser slug -> winner slug).
const blogMerges = JSON.parse(readFileSync(new URL("./config/blog-merges.json", import.meta.url), "utf8"));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/demo/arthaaspire", destination: "/arth-aspire-demo.html" },
        { source: "/demo/arthaspire", destination: "/arth-aspire-demo.html" },
        { source: "/demo/xceedbeyond", destination: "/xceedbeyond-demo.html" },
        { source: "/demo/asma-travel", destination: "/asma-travel-demo.html" },
      ],
    };
  },
  async redirects() {
    const merged = Object.entries(blogMerges).map(([from, to]) => ({ source: `/blog/${from}`, destination: `/blog/${to}`, permanent: true }));
    // Early posts that were never moved to Sanity; Google still requests them.
    const retired = [
      ["/blog/marketing-attribution-that-sales-will-actually-trust", "/digital-marketing/conversion-tracking"],
      ["/blog/when-to-automate-and-when-not-to", "/business-automation"],
      ["/blog/connected-marketing-system-what-it-actually-means", "/services"],
      ["/blog/why-most-crm-implementations-fail", "/business-automation/crm-lead-management"],
      // Folded into the AI voice calling page so they stop competing with it for "multilingual AI voice assistant".
      ["/blog/top-multilingual-ai-voice-assistant-for-indian-service", "/business-automation/ai-voice-calling"],
      ["/blog/best-multilingual-ai-voice-assistant-for-indian-customer-service", "/business-automation/ai-voice-calling"],
    ].map(([source, destination]) => ({ source, destination, permanent: true }));
    // Retired paths go first so they win over the blog-to-blog merges.
    return [...retired, ...merged, { source: "/review", destination: "https://g.page/r/CfHhzV3hPTDiEBM/review", permanent: false }];
  },
  async headers() {
    const noindex = [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];
    return ["/demo/arthaaspire", "/demo/arthaspire", "/demo/xceedbeyond", "/xceedbeyond-demo.html", "/arth-aspire-demo.html", "/demo/asma-travel", "/asma-travel-demo.html"].map((source) => ({ source, headers: noindex }));
  },
};

export default nextConfig;
