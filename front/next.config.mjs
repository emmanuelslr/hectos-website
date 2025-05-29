/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        pathname: '/**',
      },
    ],
  },
  // Set the base path for production
  basePath: process.env.NODE_ENV === 'production' ? '' : '',
  // Enable static exports
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined
};

export default nextConfig;
