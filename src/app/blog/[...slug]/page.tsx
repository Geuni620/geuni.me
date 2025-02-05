import matter from "gray-matter";
import { Container } from "@/components/layout";
import { PostBody } from "@/components/post-body";
import { PostHeader } from "@/components/post-header";
import readingTime from "reading-time";
import { getPostBySlug } from "@/utils/getPost";
import transformImgSrc from "@/lib/remark-absolute-image.mjs";
import { compileMDX } from "next-mdx-remote/rsc";
import { getPostList } from "@/utils/getPost";

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
  const { default: MDX } = MDXModule;

  return (
    <Container>
      <article className="prose dark:prose-invert">
        <MDX />
        {/* <PostHeader
          title={data.title}
          date={data.date}
          readingTime={readingMinutes}
        />
        <PostBody content={compiledContent.content} /> */}
      </article>
    </Container>
  );
}
