/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "coin-images.coingecko.com",
        port: "",
        pathname: "/coins/images/**",
      },
    ],
    loader: "custom",
    loaderFile: "src/lib/utils/image-loader.js",
  },
  reactStrictMode: false,
};

export default nextConfig;