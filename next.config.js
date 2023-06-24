/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  // async redirects() {
  //   return [
  //     {
  //       source: "/dashboard",
  //       destination: "/dashboard/profile",
  //       permanent: true,
  //     },
  //   ];
  // },
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
};

module.exports = nextConfig;
