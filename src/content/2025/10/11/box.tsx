"use client";

import { useState } from "react";
import type React from "react";
import { cn } from "@/lib/utils";

interface Props {
  initialWidth?: number;
  initialHeight?: number;
}

export const DynamicSizeBox = ({
  initialWidth = 150,
  initialHeight = 150,
}: Props) => {
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <label className="w-16 text-sm">width</label>
        <input
          type="range"
          min={50}
          max={400}
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
          className="w-64"
        />
        <input
          type="number"
          min={0}
          max={800}
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
          className="w-20 rounded border px-2 py-1"
        />
      </div>

      <div className="flex items-center gap-4">
        <label className="w-16 text-sm">height</label>
        <input
          type="range"
          min={50}
          max={400}
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
          className="w-64"
        />
        <input
          type="number"
          min={0}
          max={800}
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
          className="w-20 rounded border px-2 py-1"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* 실패 케이스: 동적 클래스 - Tailwind가 인식하지 못할 수 있음 */}
        <div>
          <div
            className={cn(
              `w-[${width}px] h-[${height}px] rounded border-2 border-blue-400 bg-blue-100/50`,
              "flex items-center justify-center text-sm text-blue-700"
            )}
          >
            동적 class (실패 가능)
          </div>
          <p className="mt-2 text-xs text-slate-500">
            w-[${"{width}"}px], h-[${"{height}"}px]는 빌드 시 스캔되지 않습니다.
          </p>
        </div>

        {/* 성공 케이스: CSS 변수 + 고정 클래스 */}
        <div
          style={
            {
              "--w": `${width}px`,
              "--h": `${height}px`,
            } as React.CSSProperties
          }
        >
          <div className="w-[var(--w)] h-[var(--h)] rounded border-2 border-green-400 bg-green-100/50 flex items-center justify-center text-sm text-green-700">
            CSS 변수 (성공)
          </div>
          <p className="mt-2 text-xs text-slate-500">
            w-[var(--w)], h-[var(--h)]는 정적인 클래스이므로 Tailwind가
            생성합니다.
          </p>
        </div>
      </div>

      {/* 선택: 미리 사용할 사이즈를 나열해서 인식시키는 앵커 */}
      <div className="sr-only">
        w-[150px] h-[150px] w-[200px] h-[200px] w-[300px] h-[300px]
      </div>
    </div>
  );
};
