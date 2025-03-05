import type { MetadataRoute } from "next";
import { getPostList } from "@/utils/getPost";
import { CONFIG } from "@/constants/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPostList();

  const mainRoute = {
    url: CONFIG.site,
    lastModified: new Date().toISOString(),
    priority: 1,
  };

  const routes = posts.map((post) => ({
    url: `${CONFIG.site}/blog/${post.dateArray.join("/")}/${post.slug}`,
    lastModified: new Date(post.date),
    priority: 0.7,
  }));

  return [mainRoute, ...routes];
}
