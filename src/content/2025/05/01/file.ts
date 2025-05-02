export const REACT_TEMPLATE_VITE_18 = {
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
      code: `import { useState } from "react";

function App() {
  const [showChild, setShowChild] = useState(true);

  const toggleChild = () => {
    setShowChild((prev) => !prev);
  };

  return (
    <div>
      <button onClick={toggleChild}>Toggle Child</button>
      {showChild && <ChildComponent />}
    </div>
  );
}

const ChildComponent = () => {
  const callbackRef = (node: HTMLDivElement) => {
    if (node !== null) {
      console.log("element is mounted");
    } else {
      console.log("element is null");
    }

    // 주석을 해제하면 Warning이 발생한다.
    // return () => {
    //   console.log("unmounted");
    // };
  };

  return <div ref={callbackRef}>Child</div>;
};

export default App;
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

export const REACT_TEMPLATE_VITE_19 = {
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
      code: `import { useState } from "react";

function App() {
  const [showChild, setShowChild] = useState(true);

  const toggleChild = () => {
    setShowChild((prev) => !prev);
  };

  return (
    <div>
      <button onClick={toggleChild}>Toggle Child</button>
      {showChild && <ChildComponent />}
    </div>
  );
}

const ChildComponent = () => {
  const callbackRef = (node: HTMLDivElement) => {
    if (node !== null) {
      console.log("element is mounted");
    } else {
      console.log("element is null");
    }

    return () => {
      console.log("unmounted");
    };
  };

  return <div ref={callbackRef}>Child</div>;
};

export default App;
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
  "name": "react-19",
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
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.22.0",
    "@types/react": "^19.0.10",
    "@types/react-dom": "^19.0.4",
    "@vitejs/plugin-react": "^4.3.4",
    "eslint": "^9.22.0",
    "eslint-plugin-react-hooks": "^5.2.0", 
    "eslint-plugin-react-refresh": "^0.4.19",
    "globals": "^16.0.0",
    "typescript": "~5.7.2",
    "typescript-eslint": "^8.26.1",
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
