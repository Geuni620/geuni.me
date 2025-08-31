"use client";

import { useRef, useState } from "react";

const TIMER = 2000;

export const ScaleButton = () => {
  const [isActive, setIsActive] = useState(false);
  const timeRef = useRef<NodeJS.Timeout | null>(null);

  const onActive = () => {
    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }

    setIsActive(true);

    timeRef.current = setTimeout(() => {
      setIsActive(false);
    }, TIMER);
  };

  return (
    <Layout>
      <div className="active:scale-95 flex flex-col gap-2 items-center justify-center transition-all duration-300 ease">
        <button
          onClick={onActive}
          className=" text-white font-semibold text-lg w-20 h-20 bg-[#fad657] rounded-md"
        />
        <span
          className={`text-xs text-gray-800 transition-all duration-300 ${
            isActive
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0"
          }`}
        >
          copied!
        </span>
      </div>
    </Layout>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="my-8">
      <div className="border border-gray-200 rounded mb-6 p-4">{children}</div>
    </div>
  );
};
