/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://sopportal.azurewebsites.net/api/:path*",
      },
    ];
  },
  images: {
    domains: ["github.com"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
