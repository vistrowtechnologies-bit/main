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
      ],
    };
  },
  async redirects() {
    const merged = Object.entries(blogMerges).map(([from, to]) => ({ source: `/blog/${from}`, destination: `/blog/${to}`, permanent: true }));
    return [...merged, { source: "/review", destination: "https://g.page/r/CfHhzV3hPTDiEBM/review", permanent: false }];
  },
  async headers() {
    const noindex = [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];
    return ["/demo/arthaaspire", "/demo/arthaspire", "/demo/xceedbeyond", "/xceedbeyond-demo.html", "/arth-aspire-demo.html"].map((source) => ({ source, headers: noindex }));
  },
};

export default nextConfig;
