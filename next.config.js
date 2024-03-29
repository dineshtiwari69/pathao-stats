/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    runtime: "experimental-edge",
  },
  async rewrites() {
    return [
      {
        source: "/pathao/:path*",
        destination: "https://api.pathao.com/v1/me/:path*",
      },
      {
        source: "/pathaov2/:path*",
        destination: "https://api.pathao.com/v2/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
