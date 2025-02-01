import { Container } from "@/components/layout";
import { getPostByYear } from "@/utils/getPost";
import Link from "next/link";
import dayjs from "dayjs";

export default async function Home() {
  const postsByYear = await getPostByYear();
  const years = Object.keys(postsByYear).sort((a, b) => b.localeCompare(a));

  return (
    <Container>
      {years.map((year) => {
        return (
          <div
            key={year}
            className="posts-group grid gap-4 border-t last:border-b border-gray-200 py-2"
          >
            {postsByYear[year].map(({ slug, title, date }, index) => (
              <Link
                key={slug}
                href={`/blog/${slug}`}
                className="grid grid-cols-[100px_1fr_100px] gap-4 items-center"
              >
                <div
                  className={`text-sm transition-colors ${
                    index === 0 ? "year-label text-gray-500" : ""
                  }`}
                >
                  {index === 0 && year}
                </div>
                <div className="text-gray-500 transition-colors hover:text-gray-900 dark:hover:text-white">
                  {title}
                </div>
                <div className="text-gray-500 text-sm transition-colors hover:text-gray-900 dark:hover:text-white">
                  {dayjs(date).format("MM. DD.")}
                </div>
              </Link>
            ))}
          </div>
        );
      })}
    </Container>
  );
}
