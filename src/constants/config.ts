import path from "path";

export const CONTENT_PATH = path.join(process.cwd(), "src/content");

export const CONFIG = {
  site: "https://geuni.me",
  title: "geuni.me",
  description: "주로 저의 생각을 정리합니다.",
  gtag: "G-BDWWNXR6R2",
} as const;
