/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    appDir: true,
    // serverActions: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
};

module.exports = nextConfig;
