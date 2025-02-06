import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";

export default function remarkToc() {
  return (tree) => {
    const headings = [];

    // 헤딩 수집
    visit(tree, "heading", (node) => {
      const text = toString(node);
      const id = text.toLowerCase().replace(/\s+/g, "-");
      headings.push({
        depth: node.depth,
        text,
        id,
      });
    });

    // TOC 생성
    const tocNode = {
      type: "list",
      children: headings.map((heading) => ({
        type: "listItem",
        children: [
          {
            type: "link",
            url: `#${heading.id}`,
            children: [{ type: "text", value: heading.text }],
          },
        ],
      })),
    };

    // 문서 시작 부분에 TOC 추가
    tree.children.unshift(
      {
        type: "heading",
        depth: 2,
        children: [{ type: "text", value: "Table of Contents" }],
      },
      tocNode
    );
  };
}
