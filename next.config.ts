import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    COINGECKO_API_KEY: process.env.COINGECKO_API_KEY,
    NEXT_PUBLIC_COINGECKO_API_KEY: process.env.NEXT_PUBLIC_COINGECKO_API_KEY,
    COINGECKO_BASE_URL: process.env.COINGECKO_BASE_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.coingecko.com"
      },
      {
        protocol: "https",
        hostname: "coin-images.coingecko.com"
      }
    ]
  }
};

export default nextConfig;
