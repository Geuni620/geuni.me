export const REACT_TEMPLATE_VITE_18 = {
  files: {
    "/index.html": {
      code: `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>React 18 + Vite</title>
    </head>
    <body>
      <div id="root"></div>
      <script type="module" src="/src/main.jsx"></script>
    </body>
  </html>`,
    },
    "/src/App.jsx": {
      code: `export default function App() {
    return <h1>Hello world (React 18)</h1>;
  }`,
    },
    "/src/main.jsx": {
      code: `import React from "react";
  import ReactDOM from "react-dom/client";
  import App from "./App";
  
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );`,
    },
    "/vite.config.js": {
      code: `import { defineConfig } from "vite";
  import react from "@vitejs/plugin-react";
  
  export default defineConfig({
    plugins: [react()],
  });`,
    },
    "/package.json": {
      code: JSON.stringify(
        {
          name: "vite-react-18",
          version: "1.0.0",
          scripts: {
            dev: "vite",
            build: "vite build",
            preview: "vite preview",
          },
          dependencies: {
            react: "18.2.0",
            "react-dom": "18.2.0",
          },
          devDependencies: {
            vite: "^5.0.0",
            "@vitejs/plugin-react": "^4.0.0",
          },
        },
        null,
        2
      ),
    },
  },
  main: "/src/main.jsx",
  environment: "vite",
};
