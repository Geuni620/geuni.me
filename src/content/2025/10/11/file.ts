export const TAILWIND_DYNAMIC_CLASS = {
  files: {
    "/index.html": {
      code: `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      />
      <title>Tailwind Dynamic Class</title>
    </head>
    <body>
      <div id="root"></div>
      <script type="module" src="/main.tsx"></script>
    </body>
  </html>`,
    },
    "/main.tsx": {
      code: `import React from "react";
  import ReactDOM from "react-dom/client";
  import "./index.css";
  import App from "./App";
  
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );`,
    },
    "/index.css": {
      code: `@tailwind base;
  @tailwind components;
  @tailwind utilities;
  
  html, body, #root { height: 100%; }`,
    },
    "/tailwind.config.js": {
      code: `/** @type {import('tailwindcss').Config} */
  export default {
    content: ["./index.html", "./App.tsx", "./main.tsx"],
    theme: { extend: {} },
    plugins: [],
  };`,
    },
    "/postcss.config.js": {
      code: `export default {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  };`,
    },
    "/vite.config.ts": {
      code: `import { defineConfig } from "vite";
  import react from "@vitejs/plugin-react";
  export default defineConfig({ plugins: [react()] });`,
    },
    "/tsconfig.json": {
      code: `{
    "compilerOptions": {
      "target": "ES2020",
      "useDefineForClassFields": true,
      "lib": ["ES2020", "DOM", "DOM.Iterable"],
      "module": "ESNext",
      "skipLibCheck": true,
      "moduleResolution": "Bundler",
      "resolveJsonModule": true,
      "isolatedModules": true,
      "noEmit": true,
      "jsx": "react-jsx",
      "strict": true
    },
    "include": ["./**/*"]
  }`,
    },
    "/cn.ts": {
      code: `import { type ClassValue, clsx } from "clsx";
  import { twMerge } from "tailwind-merge";
  export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }`,
    },
    "/App.tsx": {
      code: `import { useState } from "react";
  import { cn } from "./cn";
  
  export default function App() {
    const [width, setWidth] = useState(150);
    const [height, setHeight] = useState(150);
  
    return (
      <div className="min-h-screen bg-slate-50 p-6 text-slate-800">
        <h1 className="mb-4 text-xl font-bold">Tailwind 동적 width/height 데모</h1>
  
        <div className="mb-6 space-y-3">
          <div className="flex items-center gap-3">
            <label className="w-16 text-sm">width</label>
            <input type="range" min={50} max={400} value={width} onChange={(e) => setWidth(+e.target.value)} className="w-64" />
            <input type="number" min={0} max={800} value={width} onChange={(e) => setWidth(+e.target.value)} className="w-20 rounded border px-2 py-1" />
          </div>
          <div className="flex items-center gap-3">
            <label className="w-16 text-sm">height</label>
            <input type="range" min={50} max={400} value={height} onChange={(e) => setHeight(+e.target.value)} className="w-64" />
            <input type="number" min={0} max={800} value={height} onChange={(e) => setHeight(+e.target.value)} className="w-20 rounded border px-2 py-1" />
          </div>
        </div>
  
        <div className="grid gap-6 sm:grid-cols-2">
          {/* 실패 케이스: 동적 class */}
          <div>
            <div
              className={cn(
                \`w-[\${width}px] h-[\${height}px] rounded border-2 border-blue-400 bg-blue-100/50\`,
                "flex items-center justify-center text-sm text-blue-700"
              )}
            >
              동적 class (실패 가능)
            </div>
            <p className="mt-2 text-xs text-slate-500">
              빌드 시 스캔되지 않는 템플릿 문자열은 Tailwind가 생성하지 않습니다.
            </p>
          </div>
  
          {/* 성공 케이스: CSS 변수 */}
          <div
            style={
              {
                "--w": \`\${width}px\`,
                "--h": \`\${height}px\`,
              } as React.CSSProperties
            }
          >
            <div className="w-[var(--w)] h-[var(--h)] rounded border-2 border-green-400 bg-green-100/50 flex items-center justify-center text-sm text-green-700">
              CSS 변수 (성공)
            </div>
            <p className="mt-2 text-xs text-slate-500">
              정적 클래스 w-[var(--w)], h-[var(--h)]는 Tailwind가 빌드 시 생성합니다.
            </p>
          </div>
        </div>
  
        {/* 선택: 미리 사용할 사이즈를 나열해서 인식시키는 앵커 */}
        <div className="sr-only">
          w-[150px] h-[150px] w-[200px] h-[200px] w-[300px] h-[300px]
        </div>
      </div>
    );
  }
  `,
    },
    "/package.json": {
      code: `{
    "name": "tailwind-dynamic-class-demo",
    "private": true,
    "version": "0.0.0",
    "type": "module",
    "scripts": {
      "dev": "vite",
      "build": "vite build",
      "preview": "vite preview"
    },
    "dependencies": {
      "clsx": "^2.1.1",
      "react": "^18.2.0",
      "react-dom": "^18.2.0",
      "tailwind-merge": "^2.2.0"
    },
    "devDependencies": {
      "@types/react": "^18.2.0",
      "@types/react-dom": "^18.2.0",
      "@vitejs/plugin-react": "^4.2.0",
      "autoprefixer": "^10.4.19",
      "postcss": "^8.4.38",
      "tailwindcss": "^3.4.10",
      "typescript": "^5.3.0",
      "vite": "^5.0.0"
    }
  }`,
    },
  },
};
