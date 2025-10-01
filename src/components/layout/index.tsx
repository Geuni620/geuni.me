import { cn } from "@/lib/utils";

export const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="mx-auto max-w-screen-md px-5">{children}</div>;
};

export const SideNote = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="hidden lg:block absolute mt-1 left-[calc(50vw+320px)] text-sm text-gray-400">
      {children}
    </div>
  );
};

export const AnimationLayout = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <section
      className={cn(
        "relative mt-8 mb-[35px] rounded-none",
        "border-t border-b border-gray-400",
        "bg-white",
        "sm:border-none sm:shadow-sm sm:rounded-xl",
        className
      )}
    >
      <div className="p-10">{children}</div>
    </section>
  );
};
