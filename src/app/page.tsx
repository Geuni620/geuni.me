import { PostCard } from "@/components/post-card";
import { Container } from "@/components/layout";
import { getPostByYear } from "@/utils/getPost";

export default async function Home() {
  const postsByYear = await getPostByYear();
  const years = Object.keys(postsByYear).sort((a, b) => b.localeCompare(a));

  return (
    <Container>
      <div className="space-y-16">
        {years.map((year) => (
          <section key={year} className="space-y-4">
            <h2 className="font-semibold text-black dark:text-white">{year}</h2>
            <div className="flex flex-col gap-4">
              {postsByYear[year].map((post) => (
                <PostCard
                  key={post.slug}
                  title={post.title}
                  date={post.date}
                  href={`/blog/${post.slug}`}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </Container>
  );
}
