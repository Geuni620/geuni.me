import { PostCard } from "@/components/post-card";
import { Container } from "@/components/layout";

export default function Home() {
  return (
    <Container>
      <div className="space-y-16">
        <section className="space-y-4">
          <PostCard title="title" description="description" href="/" />
        </section>
      </div>
    </Container>
  );
}
