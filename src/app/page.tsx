import { Container } from "@/components/layout";
import { getPostByYear } from "@/utils/getPost";
import Link from "next/link";
import dayjs from "dayjs";

export default async function Home() {
  const postsByYear = await getPostByYear();
  const years = Object.keys(postsByYear).sort((a, b) => b.localeCompare(a));

  console.log(years);
  console.log(postsByYear);

  return (
    <Container>
      <div className="space-y-16">
        {years.map((year) => {
          return (
            <div key={year} className="grid grid-cols-[100px_1fr_100px] gap-4">
              {postsByYear[year].map(({ slug, title, date }, index) => (
                <Link
                  key={slug}
                  href={`/blog/${slug}`}
                  className="col-span-3 grid grid-cols-[100px_1fr_100px] gap-4 items-center"
                >
                  <div className="text-sm text-gray-500">
                    {index === 0 && year}
                  </div>
                  <div className="text-gray-500">{title}</div>
                  <div className="text-gray-500 text-sm">
                    {dayjs(date).format("MM. DD.")}
                  </div>
                </Link>
              ))}
            </div>
          );
        })}
      </div>
    </Container>
  );
}
