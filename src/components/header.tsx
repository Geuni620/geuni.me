import Image from "next/image";
import Link from "next/link";
import { Container } from "./container";

export const Header = () => {
  return (
    <header>
      <Container>
        <div className="flex flex-wrap gap-y-2 justify-between items-center">
          <Link href="/">
            <Image
              src="https://avatars.githubusercontent.com/u/56650238?v=4"
              width={30}
              height={30}
              alt="Geuni"
              className="rounded-full"
            />
          </Link>

          <nav className="flex gap-1">
            <Link href="/blog">blog</Link>
            <Link href="/projects">projects</Link>
          </nav>
        </div>
      </Container>
    </header>
  );
};
