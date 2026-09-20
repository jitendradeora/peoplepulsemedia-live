import type { NextConfig } from "next";
import { WORDPRESS_URL } from "./lib/config";

// Reads the same single config value as lib/wordpress.ts, so WordPress-hosted
// media (featured images, etc.) is always allowed regardless of environment.
const wpUrl = new URL(WORDPRESS_URL);

const nextConfig: NextConfig = {
  images: {
    // Next.js 16 blocks image optimization for hostnames resolving to a private/loopback
    // IP by default (SSRF protection). Only matters for local dev, where WordPress is on
    // localhost; a real production WORDPRESS_URL in lib/config.ts won't resolve to a private IP.
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: wpUrl.protocol.replace(":", "") as "http" | "https",
        hostname: wpUrl.hostname,
        ...(wpUrl.port ? { port: wpUrl.port } : {}),
        pathname: `${wpUrl.pathname.replace(/\/$/, "")}/wp-content/uploads/**`,
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
