/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "building-blog.storage.iran.liara.space",
                pathname: "**"
            }
        ]
    },
    reactStrictMode: true,
    distDir: "build"
};

export default nextConfig;
