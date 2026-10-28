import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "192.168.4.233:3000", "188.213.129.234"],
    },
  },
};

export default nextConfig;
