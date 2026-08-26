export const DARK_MODE_FILES = {
  "/App.tsx": {
    code: `import { useEffect, useState } from "react";
import "./App.css";

type Theme = "light" | "dark";
type AppTheme = Theme | "system";

export default function App() {
  const [appTheme, setAppTheme] = useState<AppTheme>("light");
  const [editorTheme, setEditorTheme] = useState<Theme>("light");


  console.log(\`appTheme: \${appTheme}\`);
  console.log(\`editorTheme: \${editorTheme}\`);

  useEffect(() => {
    if (appTheme !== "system") {
      setEditorTheme(appTheme);
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const updateEditorTheme = (matches: boolean) => {
      setEditorTheme(matches ? "dark" : "light");
    };

    updateEditorTheme(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      updateEditorTheme(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [appTheme]);

  return (
    <main className="theme-demo" data-theme={editorTheme}>
      <section className="theme-card">
        <h1>Theme state</h1>

        <div className="theme-buttons" aria-label="Theme selection">
          {(["light", "dark", "system"] as const).map((theme) => (
            <button
              key={theme}
              type="button"
              aria-pressed={appTheme === theme}
              onClick={() => setAppTheme(theme)}
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
      </section>
    </main>
  );
}`,
  },
  "/App.css": {
    code: `.theme-demo {
  --background: #ffffff;
  --surface: #f5f5f5;
  --text: #202124;
  --border: #d9d9d9;
  --accent: #6d4aff;

  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
  box-sizing: border-box;
  color: var(--text);
  background: var(--background);
  font-family: system-ui, sans-serif;
}

.theme-demo[data-theme="dark"] {
  --background: #17171a;
  --surface: #252529;
  --text: #f4f4f5;
  --border: #414148;
  --accent: #a996ff;
}

.theme-card {
  width: min(420px, 100%);
  padding: 32px;
  box-sizing: border-box;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--surface);
}

.theme-card h1 {
  margin: 0 0 24px;
  color: inherit;
  font-size: 28px;
}

.theme-buttons {
  display: flex;
  gap: 8px;
}

.theme-buttons button {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  color: inherit;
  background: transparent;
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
  margin: 24px 0 0;
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
}`,
  },
};
