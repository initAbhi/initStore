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
      "avatars.githubusercontent.com",
      "files.stripe.com",
      "lh3.googleusercontent.com",
      "images.unsplash.com",
      "plus.unsplash.com",
      "unsplash.com",
      "via.placeholder.com",
      "example.com",
    ],
  },
};

export default nextConfig;
