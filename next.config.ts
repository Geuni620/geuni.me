import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * @description
   * If using with Turbopack, you'll need to add the following to your next.config.js until this issue is resolved:
   * cc. https://github.com/vercel/next.js/issues/64525
   *
   */
  transpilePackages: ["next-mdx-remote"],

  /**
   * @fixme
   * 해당 부분 수정할 것
   */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;
