import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useMDXComponent } from 'next-contentlayer/hooks';

import { allPosts } from '@/.contentlayer/generated';
import { openSans } from '@/utils/fonts';

const mdxComponents: MDXComponents = {
  // 해당 부분의 a 태그만 Link로 Wrapping
  a: ({ href, children }) => <Link href={href as string}>{children}</Link>,
};

export const generatedStaticParams = async () => {
  allPosts.map((post) => ({ slug: post._raw.flattenedPath }));
};

export const generatedMetadata = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  if (!post) notFound();
};

export default function Page({ params }: { params: { slug: string } }) {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  if (!post) notFound();

  const MDXContent = useMDXComponent(post.body.code);

  return (
    <article className={`prose prose-slate mx-auto mt-10 w-full`}>
      {/* <div className="mb-8">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <time
          dateTime={post.createdAt}
          className="mb-1 text-base text-gray-600"
        >
          {new Intl.DateTimeFormat('en-US').format(new Date(post.createdAt))}
        </time>
      </div> */}
      <div className={`${openSans.className}`}>
        <MDXContent components={mdxComponents} />
      </div>
    </article>
  );
}
