"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export const HeaderLinkWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // 클릭된 요소가 H1-H6이고 id 속성이 있으며 contentRef 내부에 있는지 확인
      if (
        target.tagName.match(/^H[1-6]$/) &&
        target.id &&
        contentRef.current?.contains(target)
      ) {
        const hash = `#${target.id}`;
        router.push(hash);
      }
    };

    const container = contentRef.current;
    if (container) {
      container.addEventListener("click", handleClick);
    }

    return () => {
      if (container) {
        container.removeEventListener("click", handleClick);
      }
    };
  }, [router]);

  return <div ref={contentRef}>{children}</div>;
};
