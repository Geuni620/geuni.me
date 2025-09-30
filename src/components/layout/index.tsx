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

export const Layout = () => {
  return <div className=""></div>;
};
