import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // output:"standalone",
  // serverExternalPackages: ["argon2", "@prisma/client", "pg"],
  
  //   experimental: {
  //     turbopackUseSystemTlsCerts: true,
  //   },
  transpilePackages:["@repo/db"],
  reactCompiler: true,
};

export default nextConfig;
