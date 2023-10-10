/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"], // Add any other domains you need
  },
  api: {
    externalResolver: true,
  },
};

module.exports = nextConfig;
