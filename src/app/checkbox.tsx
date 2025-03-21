"use client";
import { useRouter, useSearchParams } from "next/navigation";

const SHOW_SHORT = "showShort";

export const Checkbox = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isChecked = searchParams.get(SHOW_SHORT) === "true";

  const onCheckboxChange = () => {
    const newValue = !isChecked;
    const params = new URLSearchParams(searchParams);

    params.set(SHOW_SHORT, newValue.toString());

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-end gap-1 mb-2">
      <div className="relative flex items-center">
        <input
          type="checkbox"
          id="short-posts-toggle"
          checked={isChecked}
          onChange={onCheckboxChange}
          className="appearance-none w-4 h-4 border border-gray-300 rounded-md cursor-pointer checked:bg-gray-100 focus:outline-none"
        />
        {isChecked && (
          <svg
            className="absolute left-0 top-0 w-4 h-4 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="none"
            stroke="#9ca3af"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="13 4 6 11 3 8"></polyline>
          </svg>
        )}
      </div>
      <label
        htmlFor="short-posts-toggle"
        className="text-gray-400 text-sm cursor-pointer select-none"
      >
        짧은 글 보기
      </label>
    </div>
  );
};
