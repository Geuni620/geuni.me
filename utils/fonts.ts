import {
  Inter,
  Nanum_Brush_Script,
  Nanum_Gothic,
  Nanum_Pen_Script,
  Noto_Sans_KR,
  Open_Sans,
} from 'next/font/google';

export const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '700'],
});

/**
 * @description error 발생 → nanum brush script 변경
 */
export const nanumPenScript = Nanum_Pen_Script({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const nanumGothic = Nanum_Gothic({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const nanumBrushScript = Nanum_Brush_Script({
  subsets: ['latin'],
  weight: ['400'],
});

export const nanumBarunGothic = Nanum_Gothic({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const notoSans = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const notoSerif = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '700'],
});
