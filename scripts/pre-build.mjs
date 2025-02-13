import fs from "fs-extra";
import path from "path";

const SOURCE_DIR = path.join(process.cwd(), "src", "content");
const TARGET_DIR = path.join(process.cwd(), "public", "blog");

const copyImage = async () => {
  try {
    await fs.emptyDir(TARGET_DIR);
    console.log("--- TARGET_DIR_EMPTYED: ---", TARGET_DIR);

    await fs.copy(SOURCE_DIR, TARGET_DIR, {
      filter: (src) => {
        const ext = path.extname(src).toLowerCase();
        return (
          fs.statSync(src).isDirectory() ||
          [".webp", ".png", ".jpg", ".jpeg", ".gif"].includes(ext)
        );
      },
    });

    console.log("--- IMAGES_COPIED: ---", TARGET_DIR);
  } catch (error) {
    console.error(error);
  }
};

copyImage();
