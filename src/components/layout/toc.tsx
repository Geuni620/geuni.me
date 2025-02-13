import { cn } from "@/lib/utils";
import { Link } from "lucide-react";

interface TocItem {
  id: string;
  heading: string;
  depth: number;
}

interface TableOfContentsProps {
  items?: TocItem[];
}

export const TOC = ({ items }: TableOfContentsProps) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav className="w-full max-w-xs py-12 pr-4 fixed top-25">
      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item.id}
            className={cn(
              "text-[15px] leading-relaxed",
              item.depth === 1 && "font-medium text-foreground",
              item.depth > 1 && "text-muted-foreground"
            )}
            style={{
              paddingLeft: `${(item.depth - 1) * 16}px`,
            }}
          >
            <a
              href={`#${item.id}`}
              className="hover:text-foreground transition-colors"
            >
              {item.heading}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
