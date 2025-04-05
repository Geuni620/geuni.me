import { githubLight } from "@codesandbox/sandpack-themes";
import { Sandpack, type SandpackFiles } from "@codesandbox/sandpack-react";

interface SandpackWrapperProps {
  files: SandpackFiles;
}

export const SandpackWrapper: React.FC<SandpackWrapperProps> = ({ files }) => {
  return (
    <div className="relative lg:-mx-20 xl:-mx-24">
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
