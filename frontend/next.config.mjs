/** @type {import('next').NextConfig} */
const nextConfig = {
  output:"export",
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*',
      },
    ];
  },
  images: {
    domains: ["github.com"],
  },
  typescript:{
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
