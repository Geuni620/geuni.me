import { Undo2 } from "lucide-react";
import { TOC } from "./toc";
import Link from "next/link";

type TOC = {
  id: string;
  heading: string;
  depth: number;
};

export const Nav = ({ toc }: { toc: TOC[] }) => {
  return (
    <nav className="w-full sm:w-[192px] flex flex-col gap-4 p-2 sm:sticky sm:top-20">
      <Link
        href="/"
        className="flex items-center gap-2 cursor-pointer transition-colors hover:text-gray-500"
      >
        <Undo2 className="w-5 h-5 transition-colors duration-200" />
        <span className="transition-colors duration-200">Back</span>
      </Link>
      <div className="hidden lg:block">
        <TOC toc={toc} />
      </div>
    </nav>
  );
};
