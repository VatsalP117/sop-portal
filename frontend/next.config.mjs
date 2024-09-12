/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["github.com"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
