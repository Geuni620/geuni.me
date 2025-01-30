import fs from "fs";
import matter from "gray-matter";
import { CONTENT_PATH } from "@/constants/config";

interface PostFrontmatter {
  title: string;
  date: string;
  categories: string[];
  summary: string;
  thumbnail: string;
  description: string;
}

interface Post extends PostFrontmatter {
  slug: string;
}

export async function getPostList(): Promise<Post[]> {
  const files = fs.readdirSync(CONTENT_PATH);

  const posts = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const fileContent = fs.readFileSync(`${CONTENT_PATH}/${file}`, "utf8");
      const { data } = matter(fileContent);

      return {
        slug,
        ...data,
      } as Post;
    });

  return posts;
}
