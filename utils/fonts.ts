import { Inter, Nanum_Pen_Script, Noto_Sans_KR } from 'next/font/google';

export const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const nanumPenScript = Nanum_Pen_Script({
  subsets: ['latin'],
  weight: ['400'],
});

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700'],
});
