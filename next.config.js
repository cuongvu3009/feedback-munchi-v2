/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"], // Add any other domains you need
  },
  i18n: {
    locales: ["en", "es", "fi"], // Define your supported locales
    defaultLocale: "en", // Set your default locale
  },
};

module.exports = nextConfig;
