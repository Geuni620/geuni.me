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
      <nav className="nav not-prose" onMouseLeave={close}>
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
      <div className="nav-panel-body">{children}</div>
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

const Feature = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <a className="nav-feature" href="#">
      <span className="nav-feature-title">{title}</span>
      <span className="nav-feature-copy">{children}</span>
    </a>
  );
};

const Featured = ({ children }: { children: React.ReactNode }) => {
  return <div className="nav-featured">{children}</div>;
};

const Links = ({ children }: { children: React.ReactNode }) => {
  return <div className="nav-link-list">{children}</div>;
};

const LinkItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <a className="nav-link-item" href="#">
      {children}
    </a>
  );
};

export const Navigation = () => {
  return (
    <Root>
      <Item value="product">Product</Item>
      <Item value="resources">Resources</Item>
      <Item value="customers">Customers</Item>

      <Panel>
        <Content value="product">
          <Featured>
            <Feature title="Intake">
              Bring requests and context in from every tool you use.
            </Feature>
            <Feature title="Plan and monitor">
              Set the plan and follow it from idea to launch.
            </Feature>
            <Feature title="AI and automations">
              Agents that follow work from conversation to code.
            </Feature>
            <Feature title="Build, review and ship">
              Write code and review pull requests inside Linear.
            </Feature>
          </Featured>
          <Links>
            <LinkItem>Integration directory</LinkItem>
            <LinkItem>Changelog</LinkItem>
            <LinkItem>Mobile</LinkItem>
            <LinkItem>Security</LinkItem>
          </Links>
        </Content>

        <Content value="resources">
          <Featured>
            <Feature title="About">
              Meet the team and the story behind Linear.
            </Feature>
            <Feature title="Careers">
              Come work with us on the tools our teams use daily.
            </Feature>
            <Feature title="Docs">
              Learn how to use every part of Linear.
            </Feature>
            <Feature title="Developers">
              Build on the Linear API and developer platform.
            </Feature>
          </Featured>
          <Links>
            <LinkItem>Switch to Linear</LinkItem>
            <LinkItem>For enterprise</LinkItem>
            <LinkItem>Startups</LinkItem>
            <LinkItem>Download</LinkItem>
          </Links>
        </Content>

        <Content value="customers">
          <Featured>
            <Feature title="Customers">See how teams ship with Linear.</Feature>
            <Feature title="Enterprise">
              Security, scale, and admin controls.
            </Feature>
          </Featured>
          <Links>
            <LinkItem>Case studies</LinkItem>
            <LinkItem>Security</LinkItem>
            <LinkItem>Contact</LinkItem>
          </Links>
        </Content>
      </Panel>
    </Root>
  );
};
