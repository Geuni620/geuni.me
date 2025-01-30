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

interface PostByYear {
  [year: string]: Post[];
}

export function sortPostByDate(posts: Post[]): Post[] {
  return posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
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

export async function getPostByYear(): Promise<PostByYear> {
  const posts = await getPostList();
  const sortedPosts = sortPostByDate(posts);

  console.log(sortedPosts);

  return sortedPosts.reduce((acc, post) => {
    const year = new Date(post.date).getFullYear();
    acc[year] = acc[year] || [];
    acc[year].push(post);
    return acc;
  }, {} as PostByYear);
}
