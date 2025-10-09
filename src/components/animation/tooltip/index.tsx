"use client";

import "./styles.css";
import { useState, useRef } from "react";

const BOUNDARY_MARGIN = 12;

export const AnchoredTooltip = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const onMouseMoveDown = (clientEvent: React.MouseEvent<HTMLDivElement>) => {
    const startX = clientEvent.clientX;
    const startY = clientEvent.clientY;
    const initialX = position.x;
    const initialY = position.y;

    const moveHandler = (moveEvent: MouseEvent) => {
      const container = containerRef.current?.getBoundingClientRect();
      const icon = iconRef.current?.getBoundingClientRect();
      if (!container || !icon) {
        return;
      }

      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      const minX = -container.width / 2 + icon.width / 2 + BOUNDARY_MARGIN;
      const maxX = container.width / 2 - icon.width / 2 - BOUNDARY_MARGIN;

      const minY = -container.height / 2 + icon.height / 2 + BOUNDARY_MARGIN;
      const maxY = container.height / 2 - icon.height / 2 - BOUNDARY_MARGIN;

      setPosition({
        x: Math.max(minX, Math.min(initialX + deltaX, maxX)),
        y: Math.max(minY, Math.min(initialY + deltaY, maxY)),
      });
    };

    const mouseUpHandler = () => {
      document.removeEventListener("mousemove", moveHandler);
    };

    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", mouseUpHandler, { once: true });
  };

  return (
    <>
      <span className="text-sm text-gray-500 w-full text-start p-2">
        position: {position.x}, {position.y}
      </span>
      <div ref={containerRef} className="layout">
        <div
          style={{
            left: `calc(50% + ${position.x}px)`,
            top: `calc(50% + ${position.y}px)`,
            transform: `scale(var(--scale))`,
          }}
          ref={iconRef}
          className="grab"
          onMouseDown={onMouseMoveDown}
        >
          <Icon size={24} />
        </div>

        <Tooltip />
      </div>
    </>
  );
};

const Tooltip = () => {
  return <div className="tooltip text-sm">grab!</div>;
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
