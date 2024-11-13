import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    basePath: "/wow-centreville",
    output: "export",
    reactStrictMode: true,
    images: {
        unoptimized: true,
    },
    assetPrefix: "./", 
};

export default nextConfig;
