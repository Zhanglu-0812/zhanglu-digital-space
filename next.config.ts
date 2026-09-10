import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Export plain static files so the site can be tested on Pages platforms.
  output: "export",
};

export default nextConfig;
