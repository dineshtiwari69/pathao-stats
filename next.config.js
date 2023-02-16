/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/pathao/:path*",
        destination: "https://api.pathao.com/v1/me/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
