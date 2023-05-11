/** @type {import('next').NextConfig} */

const exportConfig = {
  reactStrictMode: true,
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: `/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/**`,
      },
    ],
  },
};

const devConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: `/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/**`,
      },
    ],
  },
};

if (process.env.NODE_ENV === "development") {
  module.exports = devConfig;
} else {
  module.exports = exportConfig;
}
