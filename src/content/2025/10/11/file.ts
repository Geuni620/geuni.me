export const TAILWIND_DYNAMIC_CLASS = {
  files: {
    "/App.tsx": {
      code: `import { cn } from "./cn";
  
  function App() {
    return (
      <div className="min-h-screen bg-slate-50 p-8">
        <EmptyComponent width={300} height={300} />
      </div>
    );
  }
  
  interface EmptyComponentProps {
    width: number;
    height: number;
  }
  
  const EmptyComponent = ({ width, height }: EmptyComponentProps) => {
    return (
      <div className="space-y-4">
        <div className={cn(\`w-[\${width}px] h-[\${height}px] border-2 border-slate-200 bg-white rounded-lg shadow-sm flex items-center justify-center text-slate-700 font-medium\`)}>
          Dynamic: {width}px × {height}px
        </div>
        <div className={\`w-[300px] h-[300px] border-2 border-slate-200 bg-slate-100 rounded-lg shadow-sm flex items-center justify-center text-slate-700 font-medium\`}>
          Static: 300px × 300px
        </div>
      </div>
    );
  };
  
  export default App;
  `,
    },
    "/cn.ts": {
      code: `import { type ClassValue, clsx } from "clsx";
  import { twMerge } from "tailwind-merge";
  
  export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }`,
    },
    "/package.json": {
      code: `{
    "name": "tailwind-css-test",
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
      "typescript": "^5.3.0",
      "vite": "^5.0.0"
    }
  }`,
    },
  },
};
