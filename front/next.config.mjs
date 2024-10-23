/** @type {import('next').NextConfig} */
const nextConfig = {
  // webpack: (config, { dev }) => {
  //   if (dev) {
  //     config.devtool = "source-map";
  //   }
  //   return config;
  // },
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
  productionBrowserSourceMaps: false
  // async headers() {
  //   return [
  //     {
  //       source: '/app/post/(.*)',
  //       headers: [
  //         {
  //           key: 'Cache-Control',
  //           value: 'public, max-age=10, must-revalidate',
  //         },
  //       ],
  //     },
  //     {
  //       source: '/components/Header',
  //       headers: [
  //         {
  //           key: 'Cache-Control',
  //           value: 'public, max-age=604800, must-revalidate',
  //         },
  //       ],
  //     },
  //   ];
  // },
};

export default nextConfig;
