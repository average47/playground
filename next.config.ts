import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL('https://images.cds.amcn.com/**'),
      new URL('https://dimages.cds.amcn.com/**'),
    ],
  },
};

export default nextConfig;
