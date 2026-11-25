import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [{ source: "/paid-mini-ai-automator-1", destination: "/paid-mini-ai-automator-1.html" }];
  },
};

export default nextConfig;
