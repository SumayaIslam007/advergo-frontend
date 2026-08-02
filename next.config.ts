import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Bundles a minimal server + only-needed node_modules into .next/standalone
  // -- the production Dockerfile copies just that output, not the full
  // node_modules tree.
  output: "standalone",

  // ** //
  images: {
    // Local dev only: the image-optimization proxy fetching from our local
    // Django server (127.0.0.1) hangs on this machine (Node/Windows DNS
    // resolution quirk with WSL's virtual adapters) -- skip the proxy and
    // serve the original URLs directly instead.
    unoptimized: process.env.NODE_ENV !== "production",
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "logo.clearbit.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "http", hostname: "localhost", port: "8000", pathname: "/**" },
      { protocol: "http", hostname: "127.0.0.1", port: "8000", pathname: "/**" },
    ],
  },
};

export default nextConfig;
