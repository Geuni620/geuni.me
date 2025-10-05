import fs from "fs";
import matter from "gray-matter";
import { CONTENT_PATH } from "@/constants/config";
import path from "path";
import { sync } from "glob";
import { normalize } from "./index";

interface PostFrontmatter {
  title: string;
  date: string;
  dateArray: string[];
  categories: string[];
  summary: string;
  thumbnail: string;
  description: string;
  short: boolean | undefined;
  visible: false | undefined;
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

    // yyyy-mm-dd 또는 yyyy-mm 형식으로 변환
    let formattedDate = "";
    if (parts.length === 3) {
      // year, month, day가 모두 있는 경우
      formattedDate = `${parts[0]}-${String(parts[1]).padStart(
        2,
        "0"
      )}-${String(parts[2]).padStart(2, "0")}`;
    } else if (parts.length === 2) {
      // year, month만 있는 경우
      formattedDate = `${parts[0]}-${String(parts[1]).padStart(2, "0")}`;
    } else if (parts.length === 1) {
      // year만 있는 경우
      formattedDate = `${parts[0]}`;
    }

    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContent);

    return {
      slug,
      dateArray: formattedDate.split("-"),
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
  slug: string[];
}): Promise<string> {
  const decodedSlug = slug
    .map((segment) => decodeURIComponent(segment))
    .map((segment) =>
      isNaN(Number(segment)) ? segment : String(Number(segment))
    )
    .join("/");

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

    const fileSlug = slugArray
      .map((segment) => {
        return isNaN(Number(segment)) ? segment : String(Number(segment));
      })
      .join("/");

    return normalize(fileSlug) === normalizedTargetSlug;
  });

  if (!matchingFile) {
    throw new Error(`파일을 찾을 수 없습니다: ${decodedSlug}`);
  }

  return fs.readFileSync(matchingFile, "utf8");
}
