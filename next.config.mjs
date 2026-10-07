/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  async rewrites() {
    return {
      beforeFiles: [{ source: "/demo/xceedbeyond", destination: "/xceedbeyond-demo.html" }],
    };
  },
  async headers() {
    const noindex = [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];
    return ["/demo/xceedbeyond", "/xceedbeyond-demo.html", "/arth-aspire-demo.html"].map((source) => ({ source, headers: noindex }));
  },
  async redirects() {
    return [{ source: "/demo", destination: "/", permanent: false }];
  },
};

export default nextConfig;
