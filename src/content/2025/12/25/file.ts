export const LOADER_REDIRECT_EXAMPLE = {
  files: {
    "/App.tsx": {
      active: true,
      code: `import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Outlet,
  Link,
  redirect,
} from "react-router-dom";

const forceRedirect = (path: string) => {
  return ({ request }: { request: Request }) => {
    const url = new URL(request.url);
    const currentPath = url.pathname;

    if (currentPath === path) {
      console.log(\`이미 \${path}에 있음 - 리다이렉트 안 함\`);
      return null;
    }

    console.log(\`\${currentPath}에서 \${path}로 리다이렉트\`);
    return redirect(path);
  };
};

function HomePage() {
  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "4px" }}>
      <h1>Home Page</h1>
      <p>This is the home page.</p>
    </div>
  );
}

function Service1Page() {
  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "4px" }}>
      <h1>Service 1 Page</h1>
      <p>This is Service 1 page.</p>
    </div>
  );
}

function Service2Page() {
  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "4px" }}>
      <h1>Service 2 Page</h1>
      <p>This is Service 2 page.</p>
    </div>
  );
}

function NoticePage() {
  return (
    <div style={{
      padding: "24px",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      backgroundColor: "#fafafa"
    }}>
      <h1 style={{
        color: "#0f172a",
        fontSize: "1.25rem",
        fontWeight: "600",
        marginBottom: "8px"
      }}>Notice Page</h1>
      <p style={{ color: "#64748b", fontSize: "0.875rem" }}>
        This is Notice page. This is a protected route.
      </p>
    </div>
  );
}

function Layout() {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <Outlet />
    </div>
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} loader={forceRedirect("/notice-page")}>
      <Route index element={<HomePage />} />
      <Route path="service1" element={<Service1Page />} />
      <Route path="service2" element={<Service2Page />} />
      <Route path="notice-page" element={<NoticePage />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}`,
    },
    "/package.json": {
      hidden: true,
      code: `{
  "name": "loader-redirect-demo",
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
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.1.0"
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
    <title>Loader Redirect Demo</title>
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
})`,
    },
  },
};

export const LOADER_REDIRECT_WITH_SHOULD_REVALIDATE_EXAMPLE = {
  files: {
    "/App.tsx": {
      active: true,
      code: `import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Outlet,
  Link,
  redirect,
} from "react-router-dom";

const forceRedirect = (path: string) => {
  return ({ request }: { request: Request }) => {
    const url = new URL(request.url);
    const currentPath = url.pathname;

    if (currentPath === path) {
      console.log(\`이미 \${path}에 있음 - 리다이렉트 안 함\`);
      return null;
    }

    console.log(\`\${currentPath}에서 \${path}로 리다이렉트\`);
    return redirect(path);
  };
};

function HomePage() {
  return (
    <div style={{
      padding: "24px",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      backgroundColor: "#fafafa"
    }}>
      <h1 style={{
        color: "#0f172a",
        fontSize: "1.25rem",
        fontWeight: "600",
        marginBottom: "8px"
      }}>Home Page</h1>
      <p style={{ color: "#64748b", fontSize: "0.875rem" }}>
        This is the home page.
      </p>
    </div>
  );
}

function Service1Page() {
  return (
    <div style={{
      padding: "24px",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      backgroundColor: "#fafafa"
    }}>
      <h1 style={{
        color: "#0f172a",
        fontSize: "1.25rem",
        fontWeight: "600",
        marginBottom: "8px"
      }}>Service 1 Page</h1>
      <p style={{ color: "#64748b", fontSize: "0.875rem" }}>
        This is Service 1 page.
      </p>
    </div>
  );
}

function Service2Page() {
  return (
    <div style={{
      padding: "24px",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      backgroundColor: "#fafafa"
    }}>
      <h1 style={{
        color: "#0f172a",
        fontSize: "1.25rem",
        fontWeight: "600",
        marginBottom: "8px"
      }}>Service 2 Page</h1>
      <p style={{ color: "#64748b", fontSize: "0.875rem" }}>
        This is Service 2 page.
      </p>
    </div>
  );
}

function NoticePage() {
  return (
    <div style={{
      padding: "24px",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      backgroundColor: "#fafafa"
    }}>
      <h1 style={{
        color: "#0f172a",
        fontSize: "1.25rem",
        fontWeight: "600",
        marginBottom: "8px"
      }}>Notice Page</h1>
      <p style={{ color: "#64748b", fontSize: "0.875rem", marginBottom: "12px" }}>
        This is Notice page. This is a protected route.
      </p>
      <Link to="/" style={{
        color: "#3b82f6",
        fontSize: "0.875rem",
        textDecoration: "underline"
      }}>
        Go to Home
      </Link>
    </div>
  );
}

function Layout() {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <Outlet />
    </div>
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Layout />}
      loader={forceRedirect("/notice-page")}
      shouldRevalidate={() => true}
    >
      <Route index element={<HomePage />} />
      <Route path="service1" element={<Service1Page />} />
      <Route path="service2" element={<Service2Page />} />
      <Route path="notice-page" element={<NoticePage />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}`,
    },
    "/package.json": {
      hidden: true,
      code: `{
  "name": "loader-redirect-demo",
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
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.1.0"
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
    <title>Loader Redirect Demo</title>
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
})`,
    },
  },
};

export const LOADER_REDIRECT_WITH_ANCHOR_TAG_EXAMPLE = {
  files: {
    "/App.tsx": {
      active: true,
      code: `import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Outlet,
  redirect,
} from "react-router-dom";

const forceRedirect = (path: string) => {
  return ({ request }: { request: Request }) => {
    const url = new URL(request.url);
    const currentPath = url.pathname;

    if (currentPath === path) {
      console.log(\`이미 \${path}에 있음 - 리다이렉트 안 함\`);
      return null;
    }

    console.log(\`\${currentPath}에서 \${path}로 리다이렉트\`);
    return redirect(path);
  };
};

function HomePage() {
  return (
    <div style={{
      padding: "24px",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      backgroundColor: "#fafafa"
    }}>
      <h1 style={{
        color: "#0f172a",
        fontSize: "1.25rem",
        fontWeight: "600",
        marginBottom: "8px"
      }}>Home Page</h1>
      <p style={{ color: "#64748b", fontSize: "0.875rem" }}>
        This is the home page.
      </p>
    </div>
  );
}

function Service1Page() {
  return (
    <div style={{
      padding: "24px",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      backgroundColor: "#fafafa"
    }}>
      <h1 style={{
        color: "#0f172a",
        fontSize: "1.25rem",
        fontWeight: "600",
        marginBottom: "8px"
      }}>Service 1 Page</h1>
      <p style={{ color: "#64748b", fontSize: "0.875rem" }}>
        This is Service 1 page.
      </p>
    </div>
  );
}

function Service2Page() {
  return (
    <div style={{
      padding: "24px",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      backgroundColor: "#fafafa"
    }}>
      <h1 style={{
        color: "#0f172a",
        fontSize: "1.25rem",
        fontWeight: "600",
        marginBottom: "8px"
      }}>Service 2 Page</h1>
      <p style={{ color: "#64748b", fontSize: "0.875rem" }}>
        This is Service 2 page.
      </p>
    </div>
  );
}

function NoticePage() {
  return (
    <div style={{
      padding: "24px",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      backgroundColor: "#fafafa"
    }}>
      <h1 style={{
        color: "#0f172a",
        fontSize: "1.25rem",
        fontWeight: "600",
        marginBottom: "8px"
      }}>Notice Page</h1>
      <p style={{ color: "#64748b", fontSize: "0.875rem", marginBottom: "12px" }}>
        This is Notice page. This is a protected route.
      </p>
      <a href="/" style={{
        color: "#3b82f6",
        fontSize: "0.875rem",
        textDecoration: "underline"
      }}>
        Go to Home (a 태그)
      </a>
    </div>
  );
}

function Layout() {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <Outlet />
    </div>
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} loader={forceRedirect("/notice-page")}>
      <Route index element={<HomePage />} />
      <Route path="service1" element={<Service1Page />} />
      <Route path="service2" element={<Service2Page />} />
      <Route path="notice-page" element={<NoticePage />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}`,
    },
    "/package.json": {
      hidden: true,
      code: `{
  "name": "loader-redirect-demo",
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
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.1.0"
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
    <title>Loader Redirect Demo</title>
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
})`,
    },
  },
};

export const LOADER_REDIRECT_WITH_LINK_EXAMPLE = {
  files: {
    "/App.tsx": {
      active: true,
      code: `import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Outlet,
  Link,
  redirect,
} from "react-router-dom";

const forceRedirect = (path: string) => {
  return ({ request }: { request: Request }) => {
    const url = new URL(request.url);
    const currentPath = url.pathname;

    if (currentPath === path) {
      console.log(\`이미 \${path}에 있음 - 리다이렉트 안 함\`);
      return null;
    }

    console.log(\`\${currentPath}에서 \${path}로 리다이렉트\`);
    return redirect(path);
  };
};

function HomePage() {
  return (
    <div style={{
      padding: "24px",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      backgroundColor: "#fafafa"
    }}>
      <h1 style={{
        color: "#0f172a",
        fontSize: "1.25rem",
        fontWeight: "600",
        marginBottom: "8px"
      }}>Home Page</h1>
      <p style={{ color: "#64748b", fontSize: "0.875rem" }}>
        This is the home page.
      </p>
    </div>
  );
}

function Service1Page() {
  return (
    <div style={{
      padding: "24px",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      backgroundColor: "#fafafa"
    }}>
      <h1 style={{
        color: "#0f172a",
        fontSize: "1.25rem",
        fontWeight: "600",
        marginBottom: "8px"
      }}>Service 1 Page</h1>
      <p style={{ color: "#64748b", fontSize: "0.875rem" }}>
        This is Service 1 page.
      </p>
    </div>
  );
}

function Service2Page() {
  return (
    <div style={{
      padding: "24px",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      backgroundColor: "#fafafa"
    }}>
      <h1 style={{
        color: "#0f172a",
        fontSize: "1.25rem",
        fontWeight: "600",
        marginBottom: "8px"
      }}>Service 2 Page</h1>
      <p style={{ color: "#64748b", fontSize: "0.875rem" }}>
        This is Service 2 page.
      </p>
    </div>
  );
}

function NoticePage() {
  return (
    <div style={{
      padding: "24px",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      backgroundColor: "#fafafa"
    }}>
      <h1 style={{
        color: "#0f172a",
        fontSize: "1.25rem",
        fontWeight: "600",
        marginBottom: "8px"
      }}>Notice Page</h1>
      <p style={{ color: "#64748b", fontSize: "0.875rem", marginBottom: "12px" }}>
        This is Notice page. This is a protected route.
      </p>
      <Link to="/" style={{
        color: "#3b82f6",
        fontSize: "0.875rem",
        textDecoration: "underline"
      }}>
        Go to Home
      </Link>
    </div>
  );
}

function Layout() {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <Outlet />
    </div>
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} loader={forceRedirect("/notice-page")}>
      <Route index element={<HomePage />} />
      <Route path="service1" element={<Service1Page />} />
      <Route path="service2" element={<Service2Page />} />
      <Route path="notice-page" element={<NoticePage />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}`,
    },
    "/package.json": {
      hidden: true,
      code: `{
  "name": "loader-redirect-demo",
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
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.1.0"
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
    <title>Loader Redirect Demo</title>
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
})`,
    },
  },
};

export const GUARD_REDIRECT_EXAMPLE = {
  files: {
    "/App.tsx": {
      active: true,
      code: `import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Outlet,
  Navigate,
  useLocation,
  Link,
} from "react-router-dom";

function AppGuard() {
  const location = useLocation();
  const maintenancePath = "/notice-page";

  if (location.pathname !== maintenancePath) {
    console.log(\`\${location.pathname}에서 \${maintenancePath}로 리다이렉트\`);
    return <Navigate to={maintenancePath} replace />;
  }

  return <Outlet />;
}

function HomePage() {
  return (
    <div style={{
      padding: "24px",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      backgroundColor: "#fafafa"
    }}>
      <h1 style={{
        color: "#0f172a",
        fontSize: "1.25rem",
        fontWeight: "600",
        marginBottom: "8px"
      }}>Home Page</h1>
      <p style={{ color: "#64748b", fontSize: "0.875rem" }}>
        This is the home page.
      </p>
    </div>
  );
}

function Service1Page() {
  return (
    <div style={{
      padding: "24px",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      backgroundColor: "#fafafa"
    }}>
      <h1 style={{
        color: "#0f172a",
        fontSize: "1.25rem",
        fontWeight: "600",
        marginBottom: "8px"
      }}>Service 1 Page</h1>
      <p style={{ color: "#64748b", fontSize: "0.875rem" }}>
        This is Service 1 page.
      </p>
    </div>
  );
}

function Service2Page() {
  return (
    <div style={{
      padding: "24px",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      backgroundColor: "#fafafa"
    }}>
      <h1 style={{
        color: "#0f172a",
        fontSize: "1.25rem",
        fontWeight: "600",
        marginBottom: "8px"
      }}>Service 2 Page</h1>
      <p style={{ color: "#64748b", fontSize: "0.875rem" }}>
        This is Service 2 page.
      </p>
    </div>
  );
}

function NoticePage() {
  return (
    <div style={{
      padding: "24px",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      backgroundColor: "#fafafa"
    }}>
      <h1 style={{
        color: "#0f172a",
        fontSize: "1.25rem",
        fontWeight: "600",
        marginBottom: "8px"
      }}>Notice Page</h1>
      <p style={{ color: "#64748b", fontSize: "0.875rem", marginBottom: "12px" }}>
        This is Notice page. This is a protected route.
      </p>
      <Link to="/" style={{
        color: "#3b82f6",
        fontSize: "0.875rem",
        textDecoration: "underline"
      }}>
        Go to Home
      </Link>
    </div>
  );
}

function Layout() {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <Outlet />
    </div>
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route element={<AppGuard />}>
        <Route index element={<HomePage />} />
        <Route path="service1" element={<Service1Page />} />
        <Route path="service2" element={<Service2Page />} />
        <Route path="notice-page" element={<NoticePage />} />
      </Route>
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}`,
    },
    "/package.json": {
      hidden: true,
      code: `{
  "name": "guard-redirect-demo",
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
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.1.0"
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
    <title>Guard Redirect Demo</title>
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
})`,
    },
  },
};
