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
  env: {
    API_KEY_1: process.env.API_KEY_1,
    API_KEY_2: process.env.API_KEY_2,
    API_KEY_3: process.env.API_KEY_3,
    API_KEY_3: process.env.API_KEY_4,
  },
};

export default nextConfig;