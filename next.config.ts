import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // <--- disables type checking at build
  },
  eslint: {
    ignoreDuringBuilds: true, // <--- disables ESLint during build
  },
  /* config options here */
  images: {
    domains: [
      "files.stripe.com",
      "lh3.googleusercontent.com",
      "images.unsplash.com",
      "plus.unsplash.com",
      "unsplash.com",
      "via.placeholder.com",
    ],
  },
};

export default nextConfig;
