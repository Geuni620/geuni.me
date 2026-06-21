import Image, { type ImageProps } from "next/image";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface WideImageProps
  extends Omit<ImageProps, "alt" | "className" | "sizes"> {
  alt: string;
  caption?: ReactNode;
  className?: string;
  imageClassName?: string;
  sizes?: ImageProps["sizes"];
}

export const WideImage = ({
  alt,
  caption,
  className,
  imageClassName,
  sizes = "(min-width: 1280px) 832px, (min-width: 1024px) 800px, calc(100vw - 16px)",
  ...props
}: WideImageProps) => {
  return (
    <figure className={cn("not-prose my-8 lg:-mx-20 xl:-mx-24", className)}>
      <Image
        {...props}
        alt={alt}
        sizes={sizes}
        className={cn(
          "h-auto w-full rounded-lg border border-gray-200 bg-white object-contain",
          imageClassName
        )}
      />
      {caption ? (
        <figcaption className="mt-3 text-center text-sm text-gray-500">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
};
