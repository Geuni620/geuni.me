import { Container } from "@/components/layout";
import { getPostByYear } from "@/utils/getPost";
import Link from "next/link";
import dayjs from "dayjs";
import { Checkbox } from "./checkbox";

export default async function Home() {
  const postsByYear = await getPostByYear();
  const years = Object.keys(postsByYear).sort((a, b) => b.localeCompare(a));

  console.log("postsByYear", postsByYear);
  console.log("years", years);

  return (
    <Container>
      <Checkbox />
      {years.map((year) => (
        <div
          key={year}
          className="posts-group grid gap-4 border-t last:border-b border-gray-200 py-2"
        >
          {postsByYear[year].map(({ slug, title, date, dateArray }, index) => {
            const [year, month, day] = dateArray;
            return (
              <Link
                key={`${year}-${slug}-${index}`}
                href={`/blog/${year}${month ? `/${month}` : ""}${
                  day ? `/${day}` : ""
                }/${slug}`}
                className="grid grid-cols-[100px_1fr_100px] gap-4 items-center"
              >
                <div
                  className={`text-sm transition-colors ${
                    index === 0 ? "year-label text-gray-500" : ""
                  }`}
                >
                  {index === 0 && year}
                </div>
                <p className="text-base text-gray-500 transition-colors hover:text-gray-900 dark:hover:text-white">
                  {title}
                </p>
                <div className="text-gray-500 text-sm transition-colors hover:text-gray-900 dark:hover:text-white">
                  {dayjs(date).format("MM. DD.")}
                </div>
              </Link>
            );
          })}
        </div>
      ))}
    </Container>
  );
}
