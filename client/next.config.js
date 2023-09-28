/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "img.freepik.com",
      "res.cloudinary.com",
      "cdn-icons-png.flaticon.com",
      "",
    ],
  },
};

module.exports = nextConfig;
