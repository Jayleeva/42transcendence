import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["188.213.129.234", "127.0.0.1", "lauzanimo.ch"],
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "192.168.4.233:3000", "lauzanimo.ch:8443"],
    },
  },
};

export default nextConfig;