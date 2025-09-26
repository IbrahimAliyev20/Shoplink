import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'shop.markup.az',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig
