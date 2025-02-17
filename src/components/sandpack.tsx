import React, { useMemo } from "react";
import { githubLight } from "@codesandbox/sandpack-themes";
import { Sandpack } from "@codesandbox/sandpack-react";

interface SandpackWrapperProps {
  children: string;
}

export const SandpackWrapper: React.FC<SandpackWrapperProps> = ({
  children,
}) => {
  const files = useMemo(() => {
    return children
      .split("---")
      .map((file) => file.trim())
      .filter(Boolean)
      .reduce((acc: Record<string, { code: string }>, file) => {
        const lines = file.split("\n");
        if (lines.length === 0) {
          return acc;
        }

        // 첫 줄에서 파일명을 추출 (주석 표시 "//" 제거)
        const fileName = lines[0].replace(/^\/\//, "").trim();
        const code = lines.slice(1).join("\n").trim();

        if (!fileName) {
          console.warn(
            "파일 이름이 누락되었습니다. 첫 줄에 '//파일명' 형식으로 작성해주세요."
          );
          return acc;
        }

        return { ...acc, [fileName]: { code } };
      }, {} as Record<string, { code: string }>);
  }, [children]);

  return (
    <div className="relative -mx-6 sm:-mx-12 md:-mx-24 lg:-mx-32 xl:-mx-48 my-8">
      <Sandpack
        theme={githubLight}
        template="react-ts"
        files={files}
        options={{
          showLineNumbers: true,
          showInlineErrors: true,
          wrapContent: true,
        }}
      />
    </div>
  );
};
