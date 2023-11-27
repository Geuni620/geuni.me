import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useMDXComponent } from 'next-contentlayer/hooks';

import { allPosts } from '@/.contentlayer/generated';
import { GridLayout } from '@/app/components/layout/grid-layout';
import { NavIcon } from '@/app/components/nav/index';
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
    <GridLayout>
      <nav>
        <NavIcon />
      </nav>
      <article className={`prose prose-slate w-full`}>
        <div className={`${openSans.className}`}>
          <MDXContent components={mdxComponents} />
        </div>
      </article>
    </GridLayout>
  );
}
