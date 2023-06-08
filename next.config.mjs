/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  basePath: "/lbapp",
  async redirects() {
    return [
      {
        source: '/',
        destination: '/lbapp/dashboard',
        basePath: false,
        permanent: false
      }
    ]
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '',
      },
    ],
  },
}

export default nextConfig