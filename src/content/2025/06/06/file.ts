export const ERROR_BOUNDARY_NOT_SETTING_RESET_KEYS = {
  files: {
    "/App.tsx": {
      active: true,
      code: `import * as React from "react";
  import { useState } from "react";
  import { ErrorBoundary } from "./ErrorBoundary";

  
  function UserDataDisplay({ userId }: { userId: string }) {
    if (userId === "error-user") {
      throw new Error("💥 An error occurred for user ID '" + userId + "'!");
    }
  
    return (
      <div
        style={{
          padding: "1rem",
          border: "1px solid green",
          borderRadius: "4px",
          backgroundColor: "#f0fff0",
        }}
      >
        <h3 style={{ fontWeight: "bold" }}>User Data</h3>
        <p>Current User ID: {userId}</p>
        <p>✅ Data loaded successfully</p>
      </div>
    );
  }
  
  function FallbackComponent({
    error,
    reset,
  }: {
    error: Error;
    reset: () => void;
  }) {
    return (
      <div
        style={{
          padding: "1rem",
          border: "2px solid red",
          borderRadius: "4px",
          backgroundColor: "#fff0f0",
        }}
      >
        <h2 style={{ fontWeight: "bold", color: "red" }}>An error occurred</h2>
        <p>{error.message}</p>
        <button onClick={reset}>리셋하기</button>
      </div>
    );
  }
  
  export default function App() {
    const [currentUserId, setCurrentUserId] = useState("user1");
  
    return (
      <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
        <div
          style={{
            marginBottom: "1rem",
            padding: "1rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <h3 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
            Select User
          </h3>
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <button onClick={() => setCurrentUserId("user1")}>User 1</button>
            <button onClick={() => setCurrentUserId("user2")}>User 2</button>
            <button onClick={() => setCurrentUserId("error-user")}>
              Error User
            </button>
          </div>
        </div>
  
        <div style={{ marginBottom: "2rem" }}>
          <p style={{ margin: "0.5rem 0" }}>
          에러가 발생한 뒤 다른 사용자 버튼을 클릭해도 에러가 사라지지 않는다.
          </p>
          <ErrorBoundary
            renderFallback={(props) => <FallbackComponent {...props} />}
          >
            <UserDataDisplay userId={currentUserId} />
          </ErrorBoundary>
        </div>
      </div>
    );
  }`,
    },
    "/ErrorBoundary.tsx": {
      code: `import * as React from "react";
  
  interface RenderFallbackProps {
    error: Error;
    reset: () => void;
  }
  
  type Props = {
    renderFallback: (props: RenderFallbackProps) => React.ReactNode;
  };
  
  interface State {
    error: Error | null;
  }
  
  const initialState: State = {
    error: null,
  };
  
  
  export class ErrorBoundary extends React.Component<
    React.PropsWithChildren<Props>,
    State
  > {
    state = initialState;
  
    static getDerivedStateFromError(error: Error) {
      console.log("getDerivedStateFromError", error);

      return { error };
    }
  
    componentDidCatch(error: Error, info: React.ErrorInfo) {
      console.log("componentDidCatch", error, info);
    }
  
    resetErrorBoundary = () => {
      this.setState(initialState);
    };
  
    render() {
      if (this.state.error !== null) {
        return this.props.renderFallback({
          error: this.state.error,
          reset: this.resetErrorBoundary,
        });
      }
  
      return this.props.children;
    }
  }`,
    },
    "/package.json": {
      hidden: true,
      code: `{
    "name": "react-19-error-boundary-demo",
    "private": true,
    "version": "0.0.0",
    "type": "module",
    "scripts": {
      "dev": "vite",
      "build": "tsc && vite build",
      "preview": "vite preview"
    },
    "dependencies": {
      "react": "^19.0.0",
      "react-dom": "^19.0.0"
    },
    "devDependencies": {
      "@types/react": "^19.0.10",
      "@types/react-dom": "^19.0.4",
      "@vitejs/plugin-react": "^4.3.1",
      "typescript": "^5.4.5",
      "vite": "^5.2.11"
    }
  }`,
    },
    "/index.html": {
      hidden: true,
      code: `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Vite + React + TS</title>
    </head>
    <body>
      <div id="root"></div>
      <script type="module" src="/main.tsx"></script>
    </body>
  </html>`,
    },
    "/main.tsx": {
      hidden: true,
      code: `import { StrictMode } from 'react'
  import { createRoot } from 'react-dom/client'
  import App from './App.tsx'
  
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )`,
    },
    "/vite.config.ts": {
      hidden: true,
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

export const ERROR_BOUNDARY_SETTING_RESET_KEYS = {
  files: {
    "/App.tsx": {
      active: true,
      code: `import * as React from "react";
  import { useState } from "react";
  import { ErrorBoundary } from "./ErrorBoundary";

  
  function UserDataDisplay({ userId }: { userId: string }) {
    if (userId === "error-user") {
      throw new Error("💥 An error occurred for user ID '" + userId + "'!");
    }
  
    return (
      <div
        style={{
          padding: "1rem",
          border: "1px solid green",
          borderRadius: "4px",
          backgroundColor: "#f0fff0",
        }}
      >
        <h3 style={{ fontWeight: "bold" }}>User Data</h3>
        <p>Current User ID: {userId}</p>
        <p>✅ Data loaded successfully</p>
      </div>
    );
  }
  
  function FallbackComponent({
    error,
    reset,
  }: {
    error: Error;
    reset: () => void;
  }) {
    return (
      <div
        style={{
          padding: "1rem",
          border: "2px solid red",
          borderRadius: "4px",
          backgroundColor: "#fff0f0",
        }}
      >
        <h2 style={{ fontWeight: "bold", color: "red" }}>An error occurred</h2>
        <p>{error.message}</p>
        <button onClick={reset}>리셋하기</button>
      </div>
    );
  }
  
  export default function App() {
    const [currentUserId, setCurrentUserId] = useState("user1");
  
    return (
      <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
        <div
          style={{
            marginBottom: "1rem",
            padding: "1rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <h3 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
            Select User
          </h3>
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <button onClick={() => setCurrentUserId("user1")}>User 1</button>
            <button onClick={() => setCurrentUserId("user2")}>User 2</button>
            <button onClick={() => setCurrentUserId("error-user")}>
              Error User
            </button>
          </div>
        </div>
  
        <div style={{ marginBottom: "2rem" }}>
          <p style={{ margin: "0.5rem 0" }}>

          에러가 발생한 뒤 다른 사용자 버튼을 클릭해도 에러가 사라지지 않는다.
          </p>
          <ErrorBoundary
            resetKeys={[currentUserId]}
            renderFallback={(props) => <FallbackComponent {...props} />}
          >
            <UserDataDisplay userId={currentUserId} />
          </ErrorBoundary>
        </div>
      </div>
    );
  }`,
    },
    "/utils.ts": {
      code: `
      export const isDifferentArray = (a: unknown[], b: unknown[]) => {
        return (
          a.length !== b.length || a.some((item, index) => !Object.is(item, b[index]))
        );
      };
      `,
    },
    "/ErrorBoundary.tsx": {
      code: `import * as React from "react";
  import { isDifferentArray } from "./utils";
  
  interface RenderFallbackProps {
    error: Error;
    reset: () => void;
  }
  
  type Props = {
    renderFallback: (props: RenderFallbackProps) => React.ReactNode;
    resetKeys?: unknown[];
  };
  
  interface State {
    error: Error | null;
  }
  
  const initialState: State = {
    error: null,
  };
  
  
  export class ErrorBoundary extends React.Component<
    React.PropsWithChildren<Props>,
    State
  > {
    state = initialState;
  
    static getDerivedStateFromError(error: Error) {
      console.log("getDerivedStateFromError", error);

      return { error };
    }
  
    componentDidCatch(error: Error, info: React.ErrorInfo) {
      console.log("componentDidCatch", error, info);
    }
  
    resetErrorBoundary = () => {
      this.setState(initialState);
    };

    componentDidUpdate(prevProps: Props) {
      if (this.state.error == null) {
        return;
      }

      if (isDifferentArray(prevProps.resetKeys, this.props.resetKeys)) {
        this.resetErrorBoundary();
      }
    }
  
    render() {
      if (this.state.error !== null) {
        return this.props.renderFallback({
          error: this.state.error,
          reset: this.resetErrorBoundary,
        });
      }
  
      return this.props.children;
    }
  }`,
    },
    "/package.json": {
      hidden: true,
      code: `{
    "name": "react-19-error-boundary-demo",
    "private": true,
    "version": "0.0.0",
    "type": "module",
    "scripts": {
      "dev": "vite",
      "build": "tsc && vite build",
      "preview": "vite preview"
    },
    "dependencies": {
      "react": "^19.0.0",
      "react-dom": "^19.0.0"
    },
    "devDependencies": {
      "@types/react": "^19.0.10",
      "@types/react-dom": "^19.0.4",
      "@vitejs/plugin-react": "^4.3.1",
      "typescript": "^5.4.5",
      "vite": "^5.2.11"
    }
  }`,
    },
    "/index.html": {
      hidden: true,
      code: `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Vite + React + TS</title>
    </head>
    <body>
      <div id="root"></div>
      <script type="module" src="/main.tsx"></script>
    </body>
  </html>`,
    },
    "/main.tsx": {
      hidden: true,
      code: `import { StrictMode } from 'react'
  import { createRoot } from 'react-dom/client'
  import App from './App.tsx'
  
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )`,
    },
    "/vite.config.ts": {
      hidden: true,
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
