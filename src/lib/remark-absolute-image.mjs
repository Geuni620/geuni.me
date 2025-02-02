// lib/remark-absolute-image.mjs
import { visit } from "unist-util-visit";

const imgDirInsidePublic = "images";

export default function transformImgSrc() {
  return (tree) => {
    visit(tree, "image", (node) => {
      // "./" 로 시작하는 이미지 경로만 변환하도록 처리
      if (node.url.startsWith("./")) {
        const fileName = node.url.replace("./", "");
        node.url = `/${imgDirInsidePublic}/${fileName}`;
      }
    });
  };
}
