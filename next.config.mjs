import { createContentlayerPlugin } from 'next-contentlayer2';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  experimental: {
    turbo: {
      resolveExtensions: [
        '.mdx',
        '.tsx',
        '.ts',
        '.jsx',
        '.js',
        '.mjs',
        '.json',
      ],
    },
  },
  webpack: (config) => {
    config.resolve.modules.push(process.cwd())
    return config
  },
};

const withContentlayer = createContentlayerPlugin({
  // Additional Contentlayer config options
});

export default withContentlayer(nextConfig);