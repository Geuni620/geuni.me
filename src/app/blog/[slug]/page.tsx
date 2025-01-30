import fs from "fs";
import matter from "gray-matter";
import { CONTENT_PATH } from "@/constants/config";

export const generateStaticParams = async () => {
  const files = fs.readdirSync(CONTENT_PATH);

  return files.map((file) => ({
    slug: file.replace(/\.mdx$/, ""),
  }));
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const fileContent = fs.readFileSync(`${CONTENT_PATH}/${slug}.mdx`, "utf8");
  const { data, content } = matter(fileContent);

  return (
    <article className="prose dark:prose-invert">
      <h1>{data.title}</h1>
      <div>{content}</div>
    </article>
  );
}
