import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // ✅ Skip ESLint
  },
  typescript: {
    ignoreBuildErrors: true, // ✅ Skip TS type errors
  },
};

export default nextConfig;
