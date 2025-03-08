import { Container } from "@/components/layout";
import { getPostByYear } from "@/utils/getPost";
import { ArrowUpRight, Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { CONFIG } from "@/constants/config";

export default async function Home() {
  const postsByYear = await getPostByYear();
  const years = Object.keys(postsByYear).sort((a, b) => b.localeCompare(a));

  return (
    <Container>
      <section className="flex flex-col">
        <p className="flex flex-col">
          <span>이근휘</span>
          <span>Software Engineer</span>
        </p>

        <div className="flex items-center space-x-4">
          <Link
            href={CONFIG.social.github}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="w-5 h-5" />
            <span className="sr-only">Github</span>
          </Link>
          <Link
            href={CONFIG.social.twitter}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Twitter className="w-5 h-5" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link
            href={CONFIG.social.linkedin}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Linkedin className="w-5 h-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link
            href="/resume"
            className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center"
          >
            이력서
            <ArrowUpRight className="w-3 h-3 ml-1" />
          </Link>
        </div>
      </section>
    </Container>
  );
}
