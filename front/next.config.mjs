/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "th.bing.com",
                pathname: "**"
            }
        ]
    },
    reactStrictMode: true,
    distDir: "build"
};

export default nextConfig;
