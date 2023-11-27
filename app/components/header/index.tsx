'use client';

import { MAIN_MENU } from 'constant/index';
import { usePathname } from 'next/navigation';

import { allPosts } from '@/.contentlayer/generated';
import { DarkModeToggle } from '@/app/components/header/darkmode-toggle';
import { extractSegment } from '@/utils/extractSegment';

import { MainLayout } from '../layout/main-layout';
import { HeaderInfo } from './header-info';

export const Header = () => {
  const pathname = usePathname();

  let name, description, createdAt;

  if (pathname === '/') {
    // 루트 경로일 때 기본 정보 사용
    name = '이근휘'; // 여기에 기본 이름을 넣으세요
    description = 'geuni620'; // 여기에 기본 설명을 넣으세요
  } else {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 1) {
      // "/[id]" 형식의 경로일 때
      const current = MAIN_MENU.find((item) => `/${item.href}` === pathname);
      name = current?.title;
      description = current?.description;
    } else if (segments.length === 2) {
      // "/[id]/[slug]" 형식의 경로일 때
      const postName = extractSegment(pathname, 2);
      const post = allPosts.find(
        (post) => post._raw.flattenedPath === postName,
      );
      name = post?.title;
      description = post?.description; // 여기서 post의 설명을 가져오세요

      if (segments.length === 2) {
        // "/[id]/[slug]" 형식의 경로일 때
        const postName = extractSegment(pathname, 2);
        const post = allPosts.find(
          (post) => post._raw.flattenedPath === postName,
        );
        name = post?.title;
        description = post?.description;
        createdAt = post?.createdAt; // 게시글의 생성 날짜
      }
    }
  }

  return (
    <MainLayout>
      <ul data-animate className="flex items-start justify-between text-base">
        <HeaderInfo name={name} description={description} />
        <DarkModeToggle />
      </ul>
    </MainLayout>
  );
};
