import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["picsum.photos", "i.pravatar.cc"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        port: "",
        pathname: "/**",
      },
    ],
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  output: "standalone",
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["react-icons"],
  },
  productionBrowserSourceMaps: false,
  poweredByHeader: false,

  compress: true,
};

export default nextConfig;
