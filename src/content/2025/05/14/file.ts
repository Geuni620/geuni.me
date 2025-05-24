export const REACT_TEMPLATE = {
  files: {
    "/index.html": {
      code: `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <link rel="icon" type="image/svg+xml" href="/vite.svg" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Vite + React + TS</title>
    </head>
    <body>
      <div id="root"></div>
      <script type="module" src="/src/main.tsx"></script>
    </body>
  </html>`,
    },
    "/App.tsx": {
      code: `import { useEffect, useState } from "react";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Close" : "Open"}
      </button>
      <ActiveList isOpen={isOpen} />
    </div>
  );
}

export const ActiveList = ({ isOpen }: { isOpen: boolean }) => {
  const [activeTab, setActiveTab] = useState(0);

  const onClick = (id: number) => {
    setActiveTab(id);
  };

  // ✅ 렌더링 중에 조건부로 state 리셋
  if (isOpen === false && activeTab !== 0) {
    setActiveTab(0);
  }

  return (
    <div>
      <ul
        style={{
          visibility: isOpen ? "visible" : "hidden",
        }}
      >
        {LIST.map((item) => (
          <li
            key={item.id}
            id={item.id.toString()}
            onClick={() => onClick(item.id)}
            style={{
              display: "flex",
              color: "white",
              fontSize: "20px",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: activeTab === item.id ? "red" : "blue",
              borderRadius: "10px",
              padding: "20px",
              cursor: "pointer",
              margin: "10px",
            }}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

const LIST = [
  {
    id: 0,
    name: "Tab 1",
    description: "Description for tab 1",
  },
  {
    id: 1,
    name: "Tab 2",
    description: "Description for tab 2",
  },
  {
    id: 2,
    name: "Tab 3",
    description: "Description for tab 3",
  },
];
`,
    },
    "/main.tsx": {
      code: `import { StrictMode } from 'react'
  import { createRoot } from 'react-dom/client'
  import App from './App.tsx'
  
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
  `,
    },
    "/package.json": {
      code: `{
    "name": "react-18",
    "private": true,
    "version": "0.0.0",
    "type": "module",
    "scripts": {
      "dev": "vite",
      "build": "tsc -b && vite build",
      "lint": "eslint .",
      "preview": "vite preview"
    },
    "dependencies": {
      "react": "^18.2.0",
      "react-dom": "^18.2.0"
    },
    "devDependencies": {
      "@types/react": "^18.3.20",
      "@types/react-dom": "^18.3.7",
      "@vitejs/plugin-react": "^4.3.4",
      "eslint": "^8.57.1",
      "eslint-plugin-react-hooks": "^4.6.2",
      "eslint-plugin-react-refresh": "^0.4.19",
      "globals": "^16.0.0",
      "typescript": "~5.7.2",
      "typescript-eslint": "^7.18.0",
      "vite": "^6.3.1"
    }
  }`,
    },
    "/vite.config.ts": {
      code: `import { defineConfig } from 'vite'
  import react from '@vitejs/plugin-react'
  
  // https://vite.dev/config/
  export default defineConfig({
    plugins: [react()],
  })
  `,
    },
  },
};
