/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,  
  },
  images: {
    domains: ["cdn.dummyjson.com", "assets.dummyjson.com"],
  },
};

module.exports = nextConfig;
