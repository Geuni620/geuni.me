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
            className="grid grid-cols-[100px_1fr_100px] gap-4 border-t last:border-b border-gray-200 py-2"
          >
            {postsByYear[year].map(({ slug, title, date }, index) => (
              <Link
                key={slug}
                href={`/blog/${slug}`}
                className="col-span-3 grid grid-cols-[100px_1fr_100px] gap-4 items-center group"
              >
                <div className="text-sm text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                  {index === 0 && year}
                </div>
                <div className="text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                  {title}
                </div>
                <div className="text-gray-500 text-sm group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
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
