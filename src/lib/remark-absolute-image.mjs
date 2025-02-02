import { visit } from "unist-util-visit";

export default function transformImgSlug(slugSegments) {
  return () => (tree) => {
    visit(tree, "image", (node) => {
      if (node.url.startsWith("./")) {
        const fileName = node.url.replace("./", "");
        const slugPath = slugSegments.slice(0, -1).join("/");
        node.url = `/images/${slugPath}/${fileName}`;
      }
    });
  };
}
