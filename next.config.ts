import type { NextConfig } from "next";

// Deployed on Vercel (server runtime enabled for API routes under src/app/api).
// Previously this was a static export (output: "export") for GitHub Pages, which
// cannot run the /api/inspect and /api/voice/token handlers the Voice Agents
// "Try it yourself" feature depends on.
const nextConfig: NextConfig = {
  trailingSlash: true,
};

export default nextConfig;
