import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async rewrites() {
    return [
      // /vn  →  /  (home)
      { source: "/vn", destination: "/" },
      // /vn/<path>  →  /<path>  (all sub-pages)
      { source: "/vn/:path+", destination: "/:path+" },
    ];
  },
};

export default nextConfig;
