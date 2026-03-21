import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'questionofcities.org',
      },
      {
        protocol: 'https',
        hostname: 'assets.indiaonline.in',
      },
    ],
  },
};

export default nextConfig;
