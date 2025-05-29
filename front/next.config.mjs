import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  images: {
    domains: ['images.unsplash.com', 'randomuser.me'],
    unoptimized: true
  },
  experimental: {
    appDir: true,
    outputFileTracingRoot: path.join(__dirname, '../')
  }
};

export default nextConfig;
