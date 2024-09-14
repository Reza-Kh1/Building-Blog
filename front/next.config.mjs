/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev }) => {
    if (dev) {
      config.devtool = "source-map";
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "building-blog.storage.iran.liara.space",
        pathname: "**",
      },
    ],
  },
  reactStrictMode: true,
  distDir: "build",
};

export default nextConfig;
