
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/perfumes-oil",
        destination: "/perfume-oil",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
