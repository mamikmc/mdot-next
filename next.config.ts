import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
      },
    ],
    formats: ["image/avif", "image/webp"],
    qualities: [75, 80], // ← 追加
  },
};

export default nextConfig;
