import { compareDesc } from 'date-fns';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';

import { allPosts } from '@/.contentlayer/generated';

const ListPage = () => {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.createdAt), new Date(b.createdAt)),
  );

  console.log(posts[0]._raw);

  return (
    <div className="mb-7 mt-14">
      {posts.map((post) => (
        <>
          {/* 2023 / 2022 / 2021 묶어줘야함 */}
          <div className="mt-2 flex justify-between">
            <Link href={`/posts/${post._raw.flattenedPath}`} className="">
              <h2 className="text-[22px]" key={post._id}>
                {post.title}
              </h2>
            </Link>
            <time dateTime={post.createdAt}>
              {format(parseISO(post.createdAt), 'MM.dd')}
            </time>
          </div>
        </>
      ))}
    </div>
  );
};

export default ListPage;
