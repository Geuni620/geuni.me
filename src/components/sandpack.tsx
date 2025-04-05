import { useMemo } from "react";
import { githubLight } from "@codesandbox/sandpack-themes";
import { Sandpack, type SandpackProps } from "@codesandbox/sandpack-react";

const defaultOptions: SandpackProps["options"] = {
  /**
   * @description
   * https://sandpack.codesandbox.io/docs/getting-started/layout#options
   */
  showNavigator: true,
  showLineNumbers: true,
  showInlineErrors: true,
  showConsole: true,
  wrapContent: true,
  // editorHeight: 500, // default - 300
  // editorWidthPercentage: 50, // default - 50
};

interface SandpackWrapperProps {
  files: SandpackProps["files"];
  template?: SandpackProps["template"];
  options?: SandpackProps["options"];
}

export const SandpackWrapper: React.FC<SandpackWrapperProps> = ({
  files,
  template,
  options: userOptions,
}) => {
  const mergedOptions = useMemo(
    () => ({
      ...defaultOptions,
      ...userOptions,
    }),
    [userOptions]
  );

  return (
    <div className="relative lg:-mx-20 xl:-mx-24">
      <Sandpack
        files={files}
        theme={githubLight}
        template={template}
        options={mergedOptions}
      />
    </div>
  );
};
