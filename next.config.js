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
        protocol: process.env.NEXT_PUBLIC_IMAGE_STORAGE_PROTOCOL,
        hostname: process.env.NEXT_PUBLIC_IMAGE_STORAGE_HOSTNAME,
        port: process.env.NEXT_PUBLIC_IMAGE_STORAGE_PORT,
        pathname: process.env.NEXT_PUBLIC_IMAGE_STORAGE_PATHNAME,
      },
    ],
  },
};

const devConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_IMAGE_STORAGE_PROTOCOL,
        hostname: process.env.NEXT_PUBLIC_IMAGE_STORAGE_HOSTNAME,
        port: process.env.NEXT_PUBLIC_IMAGE_STORAGE_PORT,
        pathname: process.env.NEXT_PUBLIC_IMAGE_STORAGE_PATHNAME,
      },
    ],
  },
};

if (process.env.NODE_ENV === "development") {
  module.exports = devConfig;
} else {
  module.exports = exportConfig;
}
