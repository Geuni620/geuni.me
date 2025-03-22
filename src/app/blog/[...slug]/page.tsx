import matter from "gray-matter";

import { PostHeader } from "@/components/post-header";
import readingTime from "reading-time";
import { getPostBySlug, getPostList } from "@/utils/getPost";
import { Nav } from "@/components/layout/nav";
import { CONFIG } from "@/constants/config";

export const dynamicParams = false;

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) => {
  const { slug } = await params;
  const { frontmatter } = await import(`@/content/${slug.join("/")}.mdx`);
  const postImageUrl = `${CONFIG.site}/blog/${slug
    .slice(0, 3)
    .join("/")}/img.webp`;
  const defaultImageUrl = `${CONFIG.site}/opengraph-image.png`;
  const imageExists = await fetch(postImageUrl)
    .then((res) => res.status === 200)
    .catch(() => false);

  return {
    title: frontmatter.title,
    description: frontmatter.summary,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.summary,
      url: `${CONFIG.site}/blog/${slug.slice(0, 4).join("/")}`,
      images: [
        {
          url: imageExists ? postImageUrl : defaultImageUrl,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
};

export const generateStaticParams = async () => {
  const posts = await getPostList();

  return posts.map(({ dateArray, slug }) => ({
    slug: [...dateArray, slug],
  }));
};

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const showShort = resolvedSearchParams?.showShort === "true";
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
  const readingMinutes = Math.ceil(readingTime(content).minutes);

  return (
    <section className="mx-auto w-full sm:grid sm:grid-cols-[8rem_640px_0.5rem] md:w-[768px] lg:w-[1024px] lg:grid-cols-[192px_640px_192px]">
      <div>
        <Nav toc={toc} showShort={showShort} />
      </div>

      <article className="w-full p-2 prose prose-pre:bg-pre-light mx-auto">
        <PostHeader
          title={frontmatter.title}
          date={frontmatter.date}
          readingTime={readingMinutes}
        />
        <MDXComponent />
      </article>

      <div className="hidden sm:block" />
    </section>
  );
}
