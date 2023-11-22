import { compareDesc } from 'date-fns';
import { format, parseISO } from 'date-fns';
import React from 'react';

import { allPosts } from '@/.contentlayer/generated';

const ListPage = () => {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.createdAt), new Date(b.createdAt)),
  );

  return (
    <div>
      {posts.map((post) => (
        <>
          <h2 key={post._id}>{post.title}</h2>
          <time dateTime={post.createdAt}>
            {format(parseISO(post.createdAt), 'LLLL d, yyyy')}
          </time>
        </>
      ))}
    </div>
  );
};

export default ListPage;
