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

  crossOrigin: "anonymous",
  productionBrowserSourceMaps: false,
  async headers() {
    return [
      // {
      //   source: "/app/post/(.*)",
      //   headers: [
      //     {
      //       key: "Cache-Control",
      //       value: "public, max-age=10, must-revalidate",
      //     },
      //   ],
      // },
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "http://localhost:5173" }, // replace this your actual origin
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
