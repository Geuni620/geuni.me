import { visit } from "unist-util-visit";

export default function transformImgPath(slugSegments) {
  return () => (tree) => {
    visit(tree, "image", (node) => {
      if (node.url.startsWith("./")) {
        const fileName = node.url.replace("./", "");

        // slugSegments에서 단일 숫자일 경우 앞에 0을 제거
        const formattedSlug = slugSegments
          .slice(0, -1)
          .map((segment) => {
            if (!isNaN(segment) && segment.startsWith("0")) {
              return segment.slice(1); // 앞에 0 제거
            }
            return segment;
          })
          .join("/");

        node.url = `/images/${formattedSlug}/${fileName}`;
      }
    });
  };
}
