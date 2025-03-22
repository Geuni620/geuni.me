import { cn } from "@/lib/utils";

export const Button = () => {
  return (
    <section className="border border-gray-200 rounded-md p-4 flex justify-evenly">
      <div className="inline-flex flex-col gap-2">
        <span className="text-sm text-gray-800">border 1px</span>
        <button
          className={cn(
            "px-2 py-1 rounded-md bg-gray-100 text-gray-800 border border-gray-200",
            "transition-colors duration-200",
            "hover:bg-gray-200",
            "focus:border-1 focus:border-blue-300"
          )}
        >
          Button
        </button>
      </div>

      <div className="inline-flex flex-col gap-2">
        <span className="text-sm text-gray-800">border 2px</span>
        <button
          className={cn(
            "px-2 py-1 rounded-md bg-gray-100 text-gray-800 border border-gray-200",
            "transition-colors duration-200",
            "hover:bg-gray-200",
            "focus:border-2 focus:border-blue-300"
          )}
        >
          Button
        </button>
      </div>
    </section>
  );
};

export const NegativeMarginButton = () => {
  return (
    <section className="border border-gray-200 rounded-md p-4 flex justify-evenly items-center">
      <div className="inline-flex flex-col gap-2">
        <button
          className={cn(
            "px-2 py-1 rounded-md bg-gray-100 text-gray-800 border border-gray-200",
            "transition-colors duration-200",
            "hover:bg-gray-200",
            "focus:border-[2px] focus:border-blue-300 focus:m-[-1px]"
          )}
        >
          Button
        </button>
      </div>
      <pre className="text-xs text-gray-800">
        {`button:focus {
  border-width: 2px;
  border-color: #93c5fd; /* blue-300 */
  margin: -1px; /* prevent layout shift */
}`}
      </pre>
    </section>
  );
};

export const BoxShadowButton = () => {
  return (
    <>
      <style>
        {`
        button:focus {
            outline: none;
            box-shadow: 0 0 0 2px #93c5fd; /* blue-300 */
        }
      `}
      </style>
      <section className="border border-gray-200 rounded-md p-4 flex justify-evenly items-center">
        <div className="inline-flex flex-col gap-2">
          <button
            className={cn(
              "px-2 py-1 rounded-md bg-gray-100 text-gray-800 border border-gray-200",
              "transition-colors duration-200",
              "hover:bg-gray-200"
            )}
          >
            Button
          </button>
        </div>
        <pre className="text-xs text-gray-800">
          {`button:focus {
    outline: none;
    box-shadow: 0 0 0 2px #93c5fd;
}`}
        </pre>
      </section>
    </>
  );
};

export const OutlineButton = () => {
  return (
    <>
      <style>{`
        button:focus {
          outline: 2px solid #93c5fd; /* blue-300 */
          outline-offset: 0;
        }
      `}</style>
      <section className="border border-gray-200 rounded-md p-4 flex justify-evenly items-center">
        <div className="inline-flex flex-col gap-2">
          <button
            className={cn(
              "px-2 py-1 rounded-md bg-gray-100 text-gray-800 border border-gray-200",
              "transition-colors duration-200",
              "hover:bg-gray-200"
            )}
          >
            Button
          </button>
        </div>
        <pre className="text-xs text-gray-800">
          {`button:focus {
      outline: 2px solid #93c5fd;
      outline-offset: 0;
    }`}
        </pre>
      </section>
    </>
  );
};
