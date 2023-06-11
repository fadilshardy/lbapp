/**
 * @type {import('next').NextConfig}
 */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '',
      },
    ],
  },
  i18n,
};

module.exports = nextConfig;
