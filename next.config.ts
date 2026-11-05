import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // Send /backend/* requests to the Express server through this domain,
  // so the login cookie is always first-party.
  async rewrites() {
    return [
      {
        source: "/backend/:path*",
        destination: `${process.env.API_BASE_URL}/:path*`,
      },
    ];
  },

  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "i.ibb.co" },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "5000",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;