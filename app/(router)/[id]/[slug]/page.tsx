import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useMDXComponent } from 'next-contentlayer/hooks';

import { allPosts } from '@/.contentlayer/generated';

const mdxComponents: MDXComponents = {
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

  console.log(post.body.code);

  const MDXContent = useMDXComponent(post.body.code);

  return (
    <article className="prose mx-auto">
      {/* <div className="mb-8 text-center">
        <time dateTime={post.createdAt} className="mb-1 text-xs text-gray-600">
          {new Intl.DateTimeFormat('en-US').format(new Date(post.createdAt))}
        </time>
        <h1 className="text-3xl font-bold">{post.title}</h1>
      </div> */}
      <MDXContent components={mdxComponents} />
    </article>
  );
}
