import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return <section className="mx-auto max-w-xl text-2xl">{children}</section>;
};
