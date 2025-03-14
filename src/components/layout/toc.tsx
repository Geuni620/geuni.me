"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface TOC {
  id: string;
  heading: string;
  depth: number;
}

export const TOC = ({ toc }: { toc: TOC[] }) => {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -66%" }
    );

    toc.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [toc]);

  return (
    <ul className="text-sm pl-1">
      {toc.map((item) => (
        <li
          key={item.id}
          className={cn(
            "text-[13px] leading-6",
            item.depth === 1 && "font-medium text-foreground",
            item.depth > 1 && "text-muted-foreground"
          )}
          style={{
            paddingLeft: `${(item.depth - 1) * 8}px`,
          }}
        >
          <a
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById(item.id);

              if (element) {
                const yOffset = -100;
                const y =
                  element.getBoundingClientRect().top +
                  window.scrollY +
                  yOffset;
                window.scrollTo({ top: y, behavior: "smooth" });
              }
            }}
            className={cn(
              "hover:text-foreground transition-colors",
              activeId === item.id && "text-foreground"
            )}
          >
            {item.heading}
          </a>
        </li>
      ))}
    </ul>
  );
};
