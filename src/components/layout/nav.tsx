"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
export const NavIcon = () => {
  const router = useRouter();
  return (
    <div className="left-[20%] top-0">
      <span className="cursor-pointer" onClick={() => router.back()}>
        <Image src="/arrow-back.svg" alt="arrow-back" width={20} height={20} />
      </span>
    </div>
  );
};
