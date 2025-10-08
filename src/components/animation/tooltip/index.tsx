"use client";

import "./styles.css";
import { useState, useRef } from "react";

const BOUNDARY_MARGIN = 12;

export const AnchoredTooltip = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const onMouseMoveDown = (clientEvent: React.MouseEvent<HTMLDivElement>) => {
    const moveHandler = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - clientEvent.clientX;
      const deltaY = moveEvent.clientY - clientEvent.clientY;

      setPosition({
        x: position.x + deltaX,
        y: position.y + deltaY,
      });
    };

    const mouseUpHandler = () => {
      document.removeEventListener("mousemove", moveHandler);
    };

    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", mouseUpHandler, { once: true });
  };

  return (
    <div ref={containerRef} className="layout">
      <div
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
        className="grab"
        onMouseDown={onMouseMoveDown}
      >
        <Icon size={24} />
      </div>
      <Tooltip />
    </div>
  );
};

const Tooltip = () => {
  return <div className="tooltip">드래그 해보세요!</div>;
};

/**
 * @cc https://icons.pqoqubbw.dev/?q=square-chevron-down
 */
const Icon = ({ size }: { size: number }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="m16 10-4 4-4-4" />
    </svg>
  );
};
