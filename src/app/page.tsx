import { Container } from "@/components/layout";
import { getPostByYear } from "@/utils/getPost";
import Link from "next/link";
import dayjs from "dayjs";
import { Checkbox } from "./checkbox";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Home(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  const showShort = searchParams?.showShort === "true";
  const postsByYear = await getPostByYear();
  const filteredPostsByYear = Object.fromEntries(
    Object.entries(postsByYear).map(([year, posts]) => [
      year,
      showShort ? posts : posts.filter((post) => !post.short),
    ])
  );
  const years = Object.keys(filteredPostsByYear).sort((a, b) =>
    b.localeCompare(a)
  );
  const isShortContent = Object.values(postsByYear).some((posts) =>
    posts.some((post) => post.short)
  );

  return (
    <Container>
      {isShortContent && <Checkbox />}
      {years.map((year) => (
        <div
          key={year}
          className="posts-group grid gap-4 border-t last:border-b border-gray-200 py-2"
        >
          {filteredPostsByYear[year].map(
            ({ slug, title, date, dateArray, short }, index) => {
              const [year, month, day] = dateArray;
              return (
                <Link
                  key={`${year}-${slug}-${index}`}
                  href={{
                    pathname: `/blog/${year}${month ? `/${month}` : ""}${
                      day ? `/${day}` : ""
                    }/${slug}`,
                    query: { showShort: searchParams.showShort },
                  }}
                  className={`group grid grid-cols-[100px_1fr_100px] gap-4 items-center ${
                    short ? "animate-fadeIn" : ""
                  }`}
                >
                  <div
                    className={`text-sm transition-colors ${
                      index === 0 ? "year-label text-gray-500" : ""
                    }`}
                  >
                    {index === 0 && year}
                  </div>

                  <div className="flex items-center gap-2 relative">
                    {short && (
                      <div className="absolute left-[-3.125rem] text-xs text-gray-500 p-1 bg-[var(--short-bg)] rounded-md transition-colors group-hover:text-gray-900 animate-bounce">
                        short!
                      </div>
                    )}
                    <p className="text-base text-gray-500 transition-colors group-hover:text-gray-900">
                      {title}
                    </p>
                  </div>
                  <div className="text-gray-500 text-sm transition-colors group-hover:text-gray-900">
                    {dayjs(date).format("MM. DD.")}
                  </div>
                </Link>
              );
            }
          )}
        </div>
      ))}
    </Container>
  );
}
