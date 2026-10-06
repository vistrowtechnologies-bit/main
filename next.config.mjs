/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  async rewrites() {
    return {
      beforeFiles: [{ source: "/demo", destination: "/arth-aspire-demo.html" }],
    };
  },
};

export default nextConfig;
