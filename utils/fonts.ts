import {
  Inter,
  Nanum_Brush_Script,
  Noto_Sans_KR,
  Open_Sans,
} from 'next/font/google';

export const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const nanumBrushScript = Nanum_Brush_Script({
  subsets: ['latin'],
  weight: ['400'],
});

export const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
});
