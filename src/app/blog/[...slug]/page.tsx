import matter from "gray-matter";
import { NavIcon } from "@/components/layout/nav";

import { PostHeader } from "@/components/post-header";
import readingTime from "reading-time";
import { getPostBySlug, getPostList } from "@/utils/getPost";

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

  /**
   * @description
   * remark를 통해 이미지 경로를 절대 경로로 변경시키고 싶었지만, 실패..
   * post를 가져온 이유는, string 형태로 content를 가져오기 위함
   */
  const [MDXModule, post] = await Promise.all([
    import(`@/content/${slug.join("/")}.mdx`),
    getPostBySlug({ slug }),
  ]);
  const { content } = matter(post);
  const { frontmatter, default: MDXComponent, toc } = MDXModule;
  const readingMinutes = readingTime(content);

  console.log("toc", toc);

  return (
    <section className="grid mx-auto w-[1072px] grid-cols-[192px_720px_192px]">
      <nav className="flex gap-2 mt-2">
        <NavIcon />
        <span>back</span>
      </nav>

      <article className="prose dark:prose-invert">
        <PostHeader
          title={frontmatter.title}
          date={frontmatter.date}
          readingTime={readingMinutes.minutes}
        />
        <MDXComponent />
      </article>

      <div className="bg-red-500" />
    </section>
  );
}
