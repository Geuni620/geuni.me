import { visit } from "unist-util-visit";

export const remarkTOC = () => {
  return (tree) => {
    const toc = [];

    visit(tree, "heading", (node) => {
      const heading = node.children
        .filter((child) => child.type === "text")
        .map((child) => child.value)
        .join(" ");

      const id = heading.toLowerCase().replace(/ /g, "-");

      node.data = node.data || {};
      node.data.hProperties = node.data.hProperties || {};
      node.data.hProperties.id = id;

      toc.push({
        id,
        heading,
        depth: node.depth,
      });
    });

    /**
     * @description
     * TOC 데이터를 문자열로 변환하여 export 구문 생성
     */
    const exportStr = `export const toc = ${JSON.stringify(toc)}`;

    tree.children.unshift({
      type: "mdxjsEsm",
      value: exportStr,
      data: {
        estree: {
          type: "Program",
          body: [
            {
              type: "ExportNamedDeclaration",
              declaration: {
                type: "VariableDeclaration",
                kind: "const",
                declarations: [
                  {
                    type: "VariableDeclarator",
                    id: { type: "Identifier", name: "toc" },
                    init: { type: "Literal", value: toc },
                  },
                ],
              },
              specifiers: [],
            },
          ],
        },
      },
    });

    return tree;
  };
};
