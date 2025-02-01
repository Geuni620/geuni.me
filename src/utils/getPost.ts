import fs from "fs";
import matter from "gray-matter";
import { CONTENT_PATH } from "@/constants/config";
import path from "path";
import { sync } from "glob";
import { normalize } from "./index";

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
  const pattern = path.join(CONTENT_PATH, "**", "*.{md,mdx}");
  const files = sync(pattern);

  const posts = files.map((filePath) => {
    const relativePath = path.relative(CONTENT_PATH, filePath);
    const parts = relativePath.split(path.sep);
    const fileName = parts.pop() || ""; // 경로는 제외하고, 마지막 mdx, md 파일만 빼냄
    const slug = fileName.replace(/\.(md|mdx)$/, "");

    const fileContent = fs.readFileSync(filePath, "utf8");
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

  return sortedPosts.reduce((acc, post) => {
    const year = new Date(post.date).getFullYear();
    acc[year] = acc[year] || [];
    acc[year].push(post);
    return acc;
  }, {} as PostByYear);
}

export async function getPostBySlug({
  slug,
}: {
  slug: string;
}): Promise<string> {
  const decodedSlug = decodeURIComponent(slug || "");

  if (!decodedSlug) {
    throw new Error("slug 값이 제공되지 않았습니다.");
  }

  const normalizedTargetSlug = normalize(decodedSlug);

  const pattern = path.join(CONTENT_PATH, "**", "*.{md,mdx}");
  const files = sync(pattern);

  const matchingFile = files.find((filePath) => {
    const relativePath = path.relative(CONTENT_PATH, filePath);
    const withoutExt = relativePath.replace(/\.(md|mdx)$/, "");
    const slugArray = withoutExt.split(path.sep);
    const fileSlug = slugArray.pop() || "";

    return normalize(fileSlug) === normalizedTargetSlug;
  });

  if (!matchingFile) {
    throw new Error(`파일을 찾을 수 없습니다: ${decodedSlug}`);
  }

  return fs.readFileSync(matchingFile, "utf8");
}
