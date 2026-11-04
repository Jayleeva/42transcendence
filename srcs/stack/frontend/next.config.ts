import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ⚡️ À METTRE ICI : À la racine de la configuration, sans http/https ni port
  allowedDevOrigins: ["188.213.129.234"],

  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "192.168.4.233:3000", "188.213.129.234"],
    },
  },

  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "https://188.213.129.234" },
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization" },
        ]
      }
    ]
  }
};

export default nextConfig;
