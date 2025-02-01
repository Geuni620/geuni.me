import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout";

export const Header = () => {
  return (
    <header className="header">
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
        </div>
      </Container>
    </header>
  );
};
