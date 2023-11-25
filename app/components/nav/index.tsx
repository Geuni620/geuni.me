'use client';

import { useRouter } from 'next/navigation';

export const Nav = () => {
  const router = useRouter();
  return (
    <nav className="left-[20%] top-0">
      <span className="cursor-pointer" onClick={() => router.back()}>
        <img src="/arrow-back.svg" />
      </span>
    </nav>
  );
};
