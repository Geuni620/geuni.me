'use client';

import { useRouter } from 'next/navigation';

export const NavIcon = () => {
  const router = useRouter();
  return (
    <div className="left-[20%] top-0">
      {/* TODO: 이전 page의 index 값을 저장해서 이전페이지 알려주기 */}
      <span className="cursor-pointer" onClick={() => router.back()}>
        <img src="/arrow-back.svg" />
      </span>
    </div>
  );
};
