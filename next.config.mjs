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
  async headers() {
    const noindex = [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];
    return ["/demo/arthaaspire", "/demo/arthaspire", "/demo/xceedbeyond", "/xceedbeyond-demo.html", "/arth-aspire-demo.html"].map((source) => ({ source, headers: noindex }));
  },
};

export default nextConfig;
