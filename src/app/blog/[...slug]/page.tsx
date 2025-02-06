import matter from "gray-matter";
import { Container } from "@/components/layout";
import { PostBody } from "@/components/post-body";
import { PostHeader } from "@/components/post-header";
import readingTime from "reading-time";
import { getPostBySlug, getPostList } from "@/utils/getPost";

import createMDX from "@next/mdx";

export const dynamicParams = false;

export const generateStaticParams = async () => {
  const posts = await getPostList();

  return posts.map(({ dateArray, slug }) => ({
    slug: [...dateArray, slug],
  }));
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const MDXModule = await import(`@/content/${slug.join("/")}.mdx`);
  const { frontmatter, default: MDX } = MDXModule;

  return (
    <Container>
      <article className="prose dark:prose-invert">
        <PostHeader
          title={frontmatter.title}
          date={frontmatter.date}
          readingTime={123}
        />

        <MDX />

        {/* <PostBody content={compiledContent.content} /> */}
      </article>
    </Container>
  );
}
