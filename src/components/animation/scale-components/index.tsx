"use client";

import { cn } from "@/lib/utils";
import { useState, useRef } from "react";

const TIMER = 2000;

export const ScaleComponents = () => {
  const [showCopied, setShowCopied] = useState(false);
  const timeRef = useRef<NodeJS.Timeout | null>(null);

  const onActive = () => {
    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }

    setShowCopied(true);

    timeRef.current = setTimeout(() => {
      setShowCopied(false);
    }, TIMER);
  };

  return (
    <div className="active:scale-95 flex flex-col gap-2 items-center justify-center transition-all duration-300 ease">
      <button
        onClick={onActive}
        className=" text-white font-semibold text-lg w-20 h-20 bg-[#fad657] rounded-md"
      />
      <span
        className={cn(
          `text-xs text-gray-800 transition-all duration-300 ${
            showCopied
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0"
          }`
        )}
      >
        copied!
      </span>
    </div>
  );
};
