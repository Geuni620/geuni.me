'use client';

import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import { useState } from 'react';

import { allPosts } from '@/.contentlayer/generated';

const ListPage = () => {
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);

  const uniqueYears = Array.from(
    new Set(allPosts.map((post) => format(parseISO(post.createdAt), 'yyyy'))),
  );

  const postsByYear = uniqueYears.map((year) => {
    return {
      year,
      posts: allPosts.filter(
        (post) => format(parseISO(post.createdAt), 'yyyy') === year,
      ),
    };
  });
  postsByYear.sort((a, b) => b.year.localeCompare(a.year));

  return (
    <div className="my-7">
      {postsByYear.map(({ year, posts }) => (
        <div
          key={year}
          onMouseEnter={() => setHoveredYear(Number(year))}
          onMouseLeave={() => setHoveredYear(null)}
          className="border-t-[1px] py-5 last:border-b-[1px]"
        >
          <h2
            className={`text-3xl ${
              hoveredYear === Number(year) ? 'opacity-100' : 'opacity-40'
            }`}
          >
            {year}
          </h2>

          {posts.map((post) => (
            <div className="opacity-40 hover:opacity-100" key={post._id}>
              <Link data-animate href={`/library/${post._raw.flattenedPath}`}>
                <div className="mt-2 flex justify-between">
                  <span>{post.title}</span>
                  <time dateTime={post.createdAt}>
                    {format(parseISO(post.createdAt), 'MM.dd')}
                  </time>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ListPage;
