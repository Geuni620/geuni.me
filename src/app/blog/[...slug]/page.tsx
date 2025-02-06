import { Container } from "@/components/layout";
import { PostBody } from "@/components/post-body";
import { PostHeader } from "@/components/post-header";
import readingTime from "reading-time";
import { getPostBySlug, getPostList } from "@/utils/getPost";
import transformImgPath from "@/lib/remark-absolute-image.mjs";
import { compileMDX } from "next-mdx-remote/rsc";

export const generateStaticParams = async () => {
  const posts = await getPostList();

  return posts.map(({ dateArray, slug }) => ({
    slug: [...dateArray, slug],
  }));
};

type Frontmatter = {
  title: string;
  date: string;
  categories: string[];
  summary: string;
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  if (!slug) {
    return <div>Slug not found</div>;
  }

  const findPostBySlug = await getPostBySlug({ slug: slug });
  const readingMinutes = Math.ceil(readingTime(findPostBySlug).minutes);
  const { content, frontmatter } = await compileMDX<Frontmatter>({
    source: findPostBySlug,
    options: {
      mdxOptions: {
        remarkPlugins: [transformImgPath(slug)],
      },
      parseFrontmatter: true,
    },
  });

  return (
    <Container>
      <article className="prose dark:prose-invert">
        <PostHeader
          title={frontmatter.title}
          date={frontmatter.date}
          readingTime={readingMinutes}
        />
        {content}
        {/* <PostBody content={content} /> */}
      </article>
    </Container>
  );
}
