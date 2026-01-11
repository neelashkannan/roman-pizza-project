import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/roman-pizza-project",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
