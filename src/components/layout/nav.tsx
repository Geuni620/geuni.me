import { Undo2 } from "lucide-react";
import { TOC } from "./toc";

export const Nav = ({ toc }) => {
  return (
    <>
      <nav className="fixed top-25 w-[192px] flex items-center gap-2 mt-2 cursor-pointer transition-colors hover:text-gray-500">
        <div className="relative">
          <Undo2 className="w-5 h-5 transition-colors duration-200" />
          <span className="absolute left-[28px] top-1/2 -translate-y-1/2 transition-colors duration-200">
            Back
          </span>
        </div>
      </nav>
      <TOC items={toc} />
    </>
  );
};
