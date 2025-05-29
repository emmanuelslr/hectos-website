/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'randomuser.me'],
    unoptimized: true
  },
  output: 'standalone'
};

export default nextConfig;
