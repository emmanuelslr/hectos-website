/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'randomuser.me'],
    unoptimized: true
  },
  experimental: {
    appDir: true
  }
};

export default nextConfig;
