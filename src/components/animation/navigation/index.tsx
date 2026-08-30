"use client";

import { useLayoutEffect, useRef, useState } from "react";
import "./styles.css";

const ITEMS = [
  {
    id: 1,
    label: "Product",
    links: ["Intake", "AI and automations", "Changelog", "Mobile"],
  },
  {
    id: 2,
    label: "Resources",
    links: ["Docs", "Switch to Linear", "Careers", "Download"],
  },
  {
    id: 3,
    label: "Company",
    links: ["About", "Customers"],
  },
] as const;

const CLOSE_DELAY = 120;

type Position = "left" | "active" | "right";

export const Navigation = () => {
  const [currentId, setCurrentId] = useState<number>(ITEMS[0].id);
  const [isOpen, setIsOpen] = useState(false);
  const [heights, setHeights] = useState<Record<number, number>>({});

  const closeTimerRef = useRef<number | null>(null);
  const contentRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const currentIndex = ITEMS.findIndex((item) => item.id === currentId);
  const panelHeight = heights[currentId] ?? 0;

  const cancelClose = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const onOpen = (id: number) => {
    cancelClose();
    setCurrentId(id);
    setIsOpen(true);
  };

  const onScheduleClose = () => {
    cancelClose();
    closeTimerRef.current = window.setTimeout(() => {
      setIsOpen(false);
    }, CLOSE_DELAY);
  };

  useLayoutEffect(() => {
    const nextHeights: Record<number, number> = {};

    contentRefs.current.forEach((node, id) => {
      nextHeights[id] = node.getBoundingClientRect().height;
    });

    setHeights(nextHeights);
  }, []);

  const setContentRef = (id: number) => (node: HTMLDivElement | null) => {
    if (node) {
      contentRefs.current.set(id, node);
      return;
    }

    contentRefs.current.delete(id);
  };

  const positionOf = (index: number): Position => {
    if (index === currentIndex) {
      return "active";
    }

    return index < currentIndex ? "left" : "right";
  };

  return (
    <nav className="nav" onMouseLeave={onScheduleClose}>
      <ul className="nav-list">
        {ITEMS.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className="nav-item"
              data-active={isOpen && item.id === currentId}
              onMouseEnter={() => onOpen(item.id)}
              onFocus={() => onOpen(item.id)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>

      <div
        className="nav-panel"
        data-open={isOpen}
        style={
          {
            "--panel-height": `${panelHeight}px`,
          } as React.CSSProperties
        }
        onMouseEnter={cancelClose}
      >
        {ITEMS.map((item, index) => (
          <div
            key={item.id}
            ref={setContentRef(item.id)}
            className="nav-content"
            data-pos={positionOf(index)}
            aria-hidden={item.id !== currentId}
            inert={item.id !== currentId}
          >
            <p className="nav-content-label">{item.label}</p>
            <ul className="nav-content-links">
              {item.links.map((link) => (
                <li key={link}>{link}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
};
