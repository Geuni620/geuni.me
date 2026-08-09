export const DARK_MODE_LOADING_FILES = {
  "/index.html": {
    code: `<!doctype html>
<html lang="ko" data-demo="with-script">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dark mode loading test · script 있음</title>
    <style>
      html,
      body {
        min-height: 100%;
        margin: 0;
      }

      html {
        color-scheme: light;
        background: #ffffff;
      }

      html[data-theme="dark"] {
        color-scheme: dark;
        background: #17171a;
      }

      .loading {
        min-height: 100vh;
        display: grid;
        place-items: center;
        color: #202124;
        background: #ffffff;
        font: 16px/1.5 system-ui, sans-serif;
      }

      html[data-theme="dark"] .loading {
        color: #f4f4f5;
        background: #17171a;
      }
    </style>
    <script>
      try {
        const savedTheme = window.localStorage.getItem("dark-mode-demo-theme");
        const theme =
          savedTheme === "system"
            ? window.matchMedia("(prefers-color-scheme: dark)").matches
              ? "dark"
              : "light"
            : savedTheme === "dark"
              ? "dark"
              : "light";

        document.documentElement.dataset.theme = theme;
      } catch {
        document.documentElement.dataset.theme = "light";
      }
    </script>
  </head>
  <body>
    <div id="root">
      <div class="loading">React app을 불러오는 중…</div>
    </div>
    <script type="module" src="/delayed-main.ts"></script>
  </body>
</html>`,
  },
  "/no-script.html": {
    code: `<!doctype html>
<html lang="ko" data-demo="without-script">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dark mode loading test · script 없음</title>
    <style>
      html,
      body {
        min-height: 100%;
        margin: 0;
      }

      html {
        color-scheme: light;
        background: #ffffff;
      }

      html[data-theme="dark"] {
        color-scheme: dark;
        background: #17171a;
      }

      .loading {
        min-height: 100vh;
        display: grid;
        place-items: center;
        color: #202124;
        background: #ffffff;
        font: 16px/1.5 system-ui, sans-serif;
      }

      html[data-theme="dark"] .loading {
        color: #f4f4f5;
        background: #17171a;
      }
    </style>
  </head>
  <body>
    <div id="root">
      <div class="loading">React app을 불러오는 중…</div>
    </div>
    <script type="module" src="/delayed-main.ts"></script>
  </body>
</html>`,
  },
  "/delayed-main.ts": {
    code: `const DEFAULT_DELAY_MS = 2000;
const delayParam = new URLSearchParams(window.location.search).get("delay");
const requestedDelay = delayParam === null ? Number.NaN : Number(delayParam);
const delayMs = Number.isFinite(requestedDelay)
  ? Math.max(0, requestedDelay)
  : DEFAULT_DELAY_MS;

await new Promise<void>((resolve) => {
  window.setTimeout(resolve, delayMs);
});

await import("./index.tsx");`,
  },
  "/index.tsx": {
    code: `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);`,
  },
  "/App.tsx": {
    code: `import { useLayoutEffect, useSyncExternalStore, useState } from "react";

type Theme = "light" | "dark";
type AppTheme = Theme | "system";

const STORAGE_KEY = "dark-mode-demo-theme";
const MEDIA_QUERY = "(prefers-color-scheme: dark)";

function subscribeToSystemTheme(callback: () => void) {
  const mediaQuery = window.matchMedia(MEDIA_QUERY);

  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getSystemTheme(): Theme {
  return window.matchMedia(MEDIA_QUERY).matches ? "dark" : "light";
}

function getStoredTheme(): AppTheme {
  const theme = window.localStorage.getItem(STORAGE_KEY);

  return theme === "light" || theme === "dark" || theme === "system"
    ? theme
    : "light";
}

export default function App() {
  const [appTheme, setAppTheme] = useState<AppTheme>(getStoredTheme);
  const systemTheme = useSyncExternalStore(
    subscribeToSystemTheme,
    getSystemTheme,
    () => "light",
  );
  const editorTheme = appTheme === "system" ? systemTheme : appTheme;
  const hasBootstrapScript =
    document.documentElement.dataset.demo === "with-script";

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = editorTheme;
  }, [editorTheme]);

  const selectTheme = (theme: AppTheme) => {
    window.localStorage.setItem(STORAGE_KEY, theme);
    setAppTheme(theme);
  };

  return (
    <main className="theme-demo" data-theme={editorTheme}>
      <section className="theme-card">
        <p className="case-label">
          React 이전 script: {hasBootstrapScript ? "있음" : "없음"}
        </p>
        <h1>Dark mode loading test</h1>
        <p className="description">
          Dark를 선택한 뒤 두 페이지를 이동하며 2초 동안의 로딩 화면을
          비교하세요.
        </p>

        <div className="theme-buttons" aria-label="Theme selection">
          {(["light", "dark", "system"] as const).map((theme) => (
            <button
              key={theme}
              type="button"
              aria-pressed={appTheme === theme}
              onClick={() => selectTheme(theme)}
            >
              {theme[0].toUpperCase() + theme.slice(1)}
            </button>
          ))}
        </div>

        <dl className="theme-state">
          <div>
            <dt>appTheme</dt>
            <dd>{appTheme}</dd>
          </div>
          <div>
            <dt>editorTheme</dt>
            <dd>{editorTheme}</dd>
          </div>
        </dl>

        <nav className="case-links" aria-label="Loading test cases">
          <a href="/">script 있음</a>
          <a href="/no-script.html">script 없음</a>
        </nav>
      </section>
    </main>
  );
}`,
  },
  "/styles.css": {
    code: `:root {
  font-family: system-ui, sans-serif;
}

html,
body,
#root {
  min-height: 100%;
  margin: 0;
}

.theme-demo {
  --background: #ffffff;
  --surface: #f5f5f5;
  --text: #202124;
  --muted: #666a73;
  --border: #d9d9d9;
  --accent: #6d4aff;

  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
  box-sizing: border-box;
  color: var(--text);
  background: var(--background);
}

.theme-demo[data-theme="dark"] {
  --background: #17171a;
  --surface: #252529;
  --text: #f4f4f5;
  --muted: #aaaab2;
  --border: #414148;
  --accent: #a996ff;
}

.theme-card {
  width: min(460px, 100%);
  padding: 32px;
  box-sizing: border-box;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--surface);
}

.case-label,
.description {
  margin: 0;
  color: var(--muted);
}

.case-label {
  font-size: 14px;
  font-weight: 700;
}

.description {
  line-height: 1.6;
}

.theme-card h1 {
  margin: 8px 0 12px;
  color: inherit;
  font-size: 28px;
}

.theme-buttons,
.case-links {
  display: flex;
  gap: 8px;
}

.theme-buttons {
  margin-top: 24px;
}

.theme-buttons button,
.case-links a {
  flex: 1;
  padding: 9px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  color: inherit;
  background: transparent;
  text-align: center;
}

.theme-buttons button {
  cursor: pointer;
}

.theme-buttons button[aria-pressed="true"] {
  border-color: var(--accent);
  color: var(--accent);
  font-weight: 600;
}

.theme-state {
  display: grid;
  gap: 12px;
  margin: 24px 0;
}

.theme-state div {
  display: flex;
  justify-content: space-between;
  gap: 24px;
}

.theme-state dt,
.theme-state dd {
  margin: 0;
}

.theme-state dt {
  font-weight: 600;
}

.theme-state dd {
  color: var(--accent);
  font-family: ui-monospace, monospace;
}

.case-links a {
  text-decoration: none;
}

.case-links a:hover {
  border-color: var(--accent);
  color: var(--accent);
}`,
  },
};
