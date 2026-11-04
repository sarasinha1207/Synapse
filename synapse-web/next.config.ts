import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Next 16.4 writes an AGENTS.md file for AI coding tools on every `next dev`. This site doesn't use it.
  agentRules: false,
};

export default nextConfig;
