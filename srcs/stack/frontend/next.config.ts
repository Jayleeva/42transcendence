import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["188.213.129.234", "127.0.0.1"],
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "192.168.4.233:3000"],
    },
  },
};

export default nextConfig;
