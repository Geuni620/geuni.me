"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import "./styles.css";

const CLOSE_DELAY = 180;

interface NavigationContextValue {
  active?: string;
  open: (value: string) => void;
  close: () => void;
  cancelClose: () => void;
}

const NavigationContext = createContext<NavigationContextValue | null>(null);

const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("please use Navigation.Root");
  }
  return context;
};

const Root = ({ children }: { children: React.ReactNode }) => {
  const [active, setActive] = useState<string | undefined>(undefined);
  const closeTimerRef = useRef(0);

  const open = (value: string) => {
    window.clearTimeout(closeTimerRef.current);
    setActive(value);
  };

  const close = () => {
    window.clearTimeout(closeTimerRef.current);

    closeTimerRef.current = window.setTimeout(() => {
      setActive(undefined);
    }, CLOSE_DELAY);
  };

  const cancelClose = () => {
    window.clearTimeout(closeTimerRef.current);
  };

  useEffect(() => {
    return () => window.clearTimeout(closeTimerRef.current);
  }, []);

  return (
    <NavigationContext.Provider value={{ active, open, close, cancelClose }}>
      <nav className="nav" onMouseLeave={close}>
        {children}
      </nav>
    </NavigationContext.Provider>
  );
};

const Item = ({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) => {
  const { active, open } = useNavigation();

  return (
    <button
      type="button"
      className="nav-item"
      data-active={active === value ? "" : undefined}
      onMouseEnter={() => open(value)}
    >
      {children}
    </button>
  );
};

const Panel = ({ children }: { children: React.ReactNode }) => {
  const { active, cancelClose } = useNavigation();

  if (!active) {
    return null;
  }

  return (
    <div className="nav-panel" onMouseEnter={cancelClose}>
      {children}
    </div>
  );
};

const Content = ({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) => {
  const { active } = useNavigation();

  if (active !== value) {
    return null;
  }

  return children;
};
export const Navigation = () => {
  return (
    <Root>
      <Item value="home">Home</Item>
      <Item value="about">About</Item>
      <Item value="contact">Contact</Item>

      <Panel>
        <Content value="home">Home 패널</Content>
        <Content value="about">About 패널</Content>
        <Content value="contact">Contact 패널</Content>
      </Panel>
    </Root>
  );
};
