import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkToc from "./scripts/remark-toc.mjs";
// import readingTime from "remark-reading-time";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  experimental: {
    mdxRs: false,
  },

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

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkToc],
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
