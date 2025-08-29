"use client";

import { useEffect, useRef, useState } from "react";

export const Size = () => {
  const [size, setSize] = useState(0);
  const [showCopied, setShowCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const onClick = () => {
    setSize(size + 1);

    // 이미 설정된 timeout이 있다면 초기화합니다.
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setShowCopied(true);

    // 1.5초 후에 메시지를 숨깁니다.
    timeoutRef.current = setTimeout(() => {
      setShowCopied(false);
    }, 1500);
  };

  // 컴포넌트가 언마운트될 때 timeout을 정리합니다.
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="w-[200px] h-1/2 rounded-md grid items-center justify-center text-center">
      <button
        className="bg-red-500 w-20 h-20 rounded-md mx-auto active:scale-95 transition-all duration-300 relative overflow-hidden text-black font-semibold"
        onClick={onClick}
      >
        <span className="relative z-10">size</span>
        <span
          className={`absolute inset-0 z-0 flex items-center justify-center bg-red-500 transition-all duration-300 ease-in-out ${
            showCopied
              ? "translate-y-full opacity-100"
              : "translate-y-0 opacity-0"
          }`}
        >
          Copied
        </span>
      </button>
    </div>
  );
};
