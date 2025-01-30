import { PostCard } from "@/components/post-card";
import { Container } from "@/components/layout";
import { getPostList } from "@/utils/getPost";

export default async function Home() {
  const posts = await getPostList();

  return (
    <Container>
      <div className="space-y-16">
        <section className="flex flex-col gap-4">
          {posts.map((post) => (
            <PostCard
              key={post.slug}
              title={post.title}
              description={post.summary}
              href={`/blog/${post.slug}`}
            />
          ))}
        </section>
      </div>
    </Container>
  );
}
