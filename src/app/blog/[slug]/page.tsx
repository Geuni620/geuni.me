import fs from "fs";
import matter from "gray-matter";
import { CONTENT_PATH } from "@/constants/config";

export const generateStaticParams = async () => {
  const files = fs.readdirSync(CONTENT_PATH);

  return files.map((file) => ({
    slug: file.replace(/\.mdx$/, ""),
  }));
};

export default function Page({ params }: { params: { slug: string } }) {
  const fileContent = fs.readFileSync(
    `${CONTENT_PATH}/${params.slug}.mdx`,
    "utf8"
  );
  const { data, content } = matter(fileContent);

  console.log("data", data, content);

  return (
    <article className="prose dark:prose-invert">
      <h1>{data.title}</h1>
      <div>{content}</div>
    </article>
  );
}
