import matter from "gray-matter";
import { Container } from "@/components/layout";
import { PostBody } from "@/components/post-body";
import { PostHeader } from "@/components/post-header";
import readingTime from "reading-time";
import { getPostBySlug } from "@/utils/getPost";

/**
 * @fixme
 * SSG 적용할거면, 경로 생성 미리 해야해서 그떄 적용할 것
 */
// export const generateStaticParams = async () => {
//   const posts = await getPostBySlug({ slug: "1월 스크랩" });

//   return posts;
// };

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const targetSlug = slug.at(-1) || null;

  if (!targetSlug) {
    return <div>Slug not found</div>;
  }

  const findPostBySlug = await getPostBySlug({ slug: targetSlug });
  const { data, content } = matter(findPostBySlug);
  const readingMinutes = Math.ceil(readingTime(content).minutes);

  return (
    <Container>
      <article className="prose dark:prose-invert">
        <PostHeader
          title={data.title}
          date={data.date}
          readingTime={readingMinutes}
        />
        <PostBody content={content} />
      </article>
    </Container>
  );
}
