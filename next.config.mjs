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
  async redirects() {
    return [{ source: "/demo", destination: "/", permanent: false }];
  },
};

export default nextConfig;
