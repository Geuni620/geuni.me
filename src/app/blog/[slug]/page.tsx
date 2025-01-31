import fs from "fs";
import matter from "gray-matter";
import { Container } from "@/components/layout";
import { CONTENT_PATH } from "@/constants/config";
import { PostBody } from "@/components/post-body";
import { PostHeader } from "@/components/post-header";

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
    <Container>
      <article className="prose dark:prose-invert">
        <PostHeader title={data.title} date={data.date} />
        <PostBody content={content} />
      </article>
    </Container>
  );
}
