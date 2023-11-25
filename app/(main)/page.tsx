import Link from 'next/link';

import { MAIN_MENU } from '@/constant';

import { MainLayout } from '../components/layout/main-layout';

export default function Home() {
  return (
    <MainLayout>
      <div data-animate data-animate-speed="slow">
        <div className="mb-7 mt-14 select-none">
          <p>기록하는 공간이 필요했습니다.</p>
          <p>머리가 좋지 못해, 머리에 다 담기엔 생각이 너무 많습니다.</p>
          <p>공간을 만들어 짧게라도 기록하려 합니다.</p>
        </div>

        <div data-animate className="mb-7 mt-14 flex select-none gap-7">
          <p className="text-2xl">기록</p>
          <ul>
            {MAIN_MENU.map(({ title, description, href }) => (
              <Link href={href} key={title}>
                <li className="li-item flex items-center justify-center text-xl">
                  <p>{title}</p>
                  <span className="description ml-3 text-base">
                    {description}
                  </span>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </MainLayout>
  );
}
