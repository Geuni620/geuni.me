"use client";

import { useRouter } from "next/navigation";

export const HeaderLinkWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();

  const callbackRef = (node: HTMLDivElement) => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (
        target.tagName.match(/^H[1-6]$/) &&
        target.id &&
        node.contains(target)
      ) {
        const hash = `#${target.id}`;
        router.push(hash);
      }
    };

    node.addEventListener("click", handleClick);

    return () => {
      node.removeEventListener("click", handleClick);
    };
  };

  return <div ref={callbackRef}>{children}</div>;
};
