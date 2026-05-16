import { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../UserContext";

const NODES = {
  App: {
    file: "src/App.jsx",
    badge: "Provider wrapper",
    badgeColor: "#7c3aed",
    desc: "The root component. Its only job is to wrap everything in UserProvider so the entire tree has access to user data.",
    why: "Without this wrapper, no child component can access the context. Think of it as plugging in the power source.",
    before:
      "No change here — App still wraps the tree. The difference is what it wraps it WITH.",
    code: `import { UserProvider } from "./UserContext";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <UserProvider>
      <Dashboard />
    </UserProvider>
  );
}`,
  },
  UserProvider: {
    file: "src/UserContext.jsx",
    badge: "Context source",
    badgeColor: "#10b981",
    desc: "Creates and holds the user state. Exposes it to any component in the tree via Context.Provider — no matter how deeply nested.",
    why: "This is the single source of truth. Any component that needs user data asks the context directly instead of receiving it through props.",
    before:
      "Before context, App would hold user state and pass it as props: <Dashboard user={user} />",
    code: `export function UserProvider({ children }) {
  const [user, setUser] = useState({
    name, email, themePreference
  });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}`,
  },
  Dashboard: {
    file: "src/components/Dashboard.jsx",
    badge: "Passthrough",
    badgeColor: "#f59e0b",
    desc: "Renders Sidebar but does NOT use user data at all. With context, it doesn't even know user exists.",
    why: "This is the key win. Dashboard is completely decoupled from user data. If user changes, Dashboard does NOT re-render.",
    before: `// BEFORE — prop drilling pain:
function Dashboard({ user }) {
  return <Sidebar user={user} />;
}`,
    code: `// AFTER — clean with context:
function Dashboard() {
  return <Sidebar />;
}`,
  },
  Sidebar: {
    file: "src/components/Sidebar.jsx",
    badge: "Passthrough",
    badgeColor: "#f59e0b",
    desc: "Same story as Dashboard — renders UserProfile but never touches user data itself.",
    why: "Sidebar is a clean intermediary. Context keeps it free of data responsibilities it doesn't own.",
    before: `// BEFORE — prop drilling:
function Sidebar({ user }) {
  return <UserProfile user={user} />;
}`,
    code: `// AFTER — clean with context:
function Sidebar() {
  return <UserProfile />;
}`,
  },
  UserProfile: {
    file: "src/components/UserProfile.jsx",
    badge: "Context consumer",
    badgeColor: "#3b82f6",
    desc: "The deepest component. Uses useContext to grab user data directly — no props needed from any parent.",
    why: "This is the payoff. UserProfile gets exactly what it needs from context in one line.",
    before: `// BEFORE — prop drilling:
function UserProfile({ user }) {
  return <p>{user.name}</p>;
}`,
    code: `// AFTER — direct context access:
function UserProfile() {
  const { user } = useContext(UserContext);
  return <p>{user.name}</p>;
}`,
  },
};

const TOUR = [
  {
    node: "App",
    tip: "App wraps everything in UserProvider. This enables context for the whole tree.",
  },
  {
    node: "UserProvider",
    tip: "UserProvider holds state and makes it available to any component below.",
  },
  {
    node: "Dashboard",
    tip: "Dashboard is completely clean — no props passed.",
  },
  {
    node: "Sidebar",
    tip: "Sidebar just renders UserProfile. It knows nothing about user data.",
  },
  {
    node: "UserProfile",
    tip: "UserProfile reads user directly from context with useContext.",
  },
];

const treeNodes = [
  {
    id: "App",
    x: 90,
    y: 10,
    w: 140,
    h: 44,
    label: "App",
    sub: "Root component",
  },
  {
    id: "UserProvider",
    x: 60,
    y: 100,
    w: 200,
    h: 44,
    label: "UserProvider",
    sub: "Holds user state",
  },
  {
    id: "Dashboard",
    x: 60,
    y: 190,
    w: 200,
    h: 44,
    label: "Dashboard",
    sub: "No user props needed",
  },
  {
    id: "Sidebar",
    x: 60,
    y: 280,
    w: 200,
    h: 44,
    label: "Sidebar",
    sub: "No user props needed",
  },
  {
    id: "UserProfile",
    x: 60,
    y: 362,
    w: 200,
    h: 36,
    label: "UserProfile",
    sub: "useContext",
  },
];

const propNodes = [
  {
    id: "App",
    x: 90,
    y: 30,
    w: 140,
    h: 44,
    label: "App",
    sub: "Holds user state",
  },
  {
    id: "Dashboard",
    x: 60,
    y: 140,
    w: 200,
    h: 44,
    label: "Dashboard",
    sub: "receives user prop",
  },
  {
    id: "Sidebar",
    x: 60,
    y: 250,
    w: 200,
    h: 44,
    label: "Sidebar",
    sub: "passes user prop",
  },
  {
    id: "UserProfile",
    x: 60,
    y: 360,
    w: 200,
    h: 44,
    label: "UserProfile",
    sub: "finally uses user",
  },
];

export default function ContextExplorer() {
  const { user, updateUser } = useContext(UserContext);
  const [selected, setSelected] = useState("App");
  const [mode, setMode] = useState("before");
  const [tourStep, setTourStep] = useState(null);
  const [pulse, setPulse] = useState(false);
  const prevUser = useRef(user);

  const activeNode = tourStep !== null ? TOUR[tourStep].node : selected;
  const node = NODES[activeNode];

  useEffect(() => {
    if (JSON.stringify(prevUser.current) !== JSON.stringify(user)) {
      setPulse(true);
      setTimeout(() => setPulse(false), 1000);
      prevUser.current = user;
    }
  }, [user]);

  function nextTour() {
    if (tourStep === null) {
      setTourStep(0);
      return;
    }
    if (tourStep < TOUR.length - 1) {
      setTourStep(tourStep + 1);
    } else {
      setTourStep(null);
    }
  }

  const s = {
    container: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "16px",
      padding: "24px",
      maxWidth: "1000px",
      margin: "0 auto",
    },
    card: {
      background: "var(--code-bg)",
      border: "1px solid var(--border)",
      borderRadius: "12px",
      padding: "12px",
    },
    label: {
      fontSize: "12px",
      fontWeight: "500",
      color: "var(--text)",
      marginBottom: "8px",
    },
    input: {
      width: "100%",
      padding: "6px 10px",
      borderRadius: "8px",
      border: "1px solid var(--border)",
      fontSize: "13px",
      background: "var(--bg)",
      color: "var(--text-h)",
      boxSizing: "border-box",
    },
    pre: {
      margin: 0,
      fontSize: "10px",
      background: "var(--bg)",
      border: "1px solid var(--border)",
      borderRadius: "8px",
      padding: "10px",
      overflowX: "auto",
      whiteSpace: "pre-wrap",
      color: "var(--text-h)",
    },
    btn: {
      padding: "6px 14px",
      borderRadius: "8px",
      border: "1px solid var(--border)",
      cursor: "pointer",
      fontSize: "12px",
      background: "var(--bg)",
      color: "var(--text-h)",
    },
    btnActive: {
      padding: "6px 14px",
      borderRadius: "8px",
      border: "1px solid var(--accent)",
      cursor: "pointer",
      fontSize: "12px",
      background: "var(--accent-bg)",
      color: "var(--accent)",
    },
  };

  return (
    <div style={s.container}>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {/* BUTTONS */}
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            style={mode === "before" ? s.btnActive : s.btn}
            onClick={() => setMode("before")}
          >
            Prop drilling (before)
          </button>
          <button
            style={mode === "after" ? s.btnActive : s.btn}
            onClick={() => setMode("after")}
          >
            Context (after)
          </button>
        </div>

        <p style={{ fontSize: "12px", color: "var(--text)", margin: 0 }}>
          Component tree — click any node
        </p>

        {/* AFTER tree */}
        {mode === "after" && (
          <svg width="100%" viewBox="0 0 320 420" style={{ display: "block" }}>
            <rect
              x="10"
              y="82"
              width="300"
              height="308"
              rx="12"
              fill="none"
              stroke="#10b981"
              strokeWidth="1"
              strokeDasharray="6 4"
              opacity="0.4"
            />
            <text
              x="20"
              y="97"
              fontSize="10"
              fill="#10b981"
              fontFamily="system-ui"
              opacity="0.8"
            >
              UserProvider context boundary
            </text>
            <line
              x1="160"
              y1="54"
              x2="160"
              y2="100"
              stroke="var(--border)"
              strokeWidth="0.5"
            />
            <line
              x1="160"
              y1="144"
              x2="160"
              y2="190"
              stroke="var(--border)"
              strokeWidth="0.5"
            />
            <line
              x1="160"
              y1="234"
              x2="160"
              y2="280"
              stroke="var(--border)"
              strokeWidth="0.5"
            />
            <line
              x1="160"
              y1="324"
              x2="160"
              y2="362"
              stroke="var(--border)"
              strokeWidth="0.5"
            />
            <line
              x1="252"
              y1="122"
              x2="252"
              y2="378"
              stroke={pulse ? "var(--accent)" : "#10b981"}
              strokeWidth={pulse ? "2.5" : "1.5"}
              strokeDasharray="4 4"
              opacity="0.6"
              style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
            >
              <animate
                attributeName="stroke-dashoffset"
                from="20"
                to="0"
                dur="1s"
                repeatCount="indefinite"
              />
            </line>
            <text
              x="258"
              y="255"
              fontSize="10"
              fill="#10b981"
              fontFamily="system-ui"
              opacity="0.8"
            >
              useContext
            </text>
            {treeNodes.map((n) => (
              <g
                key={n.id}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setSelected(n.id);
                  setTourStep(null);
                }}
              >
                <rect
                  x={n.x}
                  y={n.y}
                  width={n.w}
                  height={n.h}
                  rx="8"
                  fill={
                    activeNode === n.id ? "var(--accent-bg)" : "var(--code-bg)"
                  }
                  stroke={
                    activeNode === n.id
                      ? "var(--accent)"
                      : NODES[n.id].badgeColor
                  }
                  strokeWidth={activeNode === n.id ? "1.5" : "0.5"}
                  style={{ transition: "all 0.2s" }}
                />
                <text
                  x={n.x + n.w / 2}
                  y={n.y + 16}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="500"
                  fill="var(--text-h)"
                  fontFamily="system-ui"
                >
                  {n.label}
                </text>
                <text
                  x={n.x + n.w / 2}
                  y={n.y + 32}
                  textAnchor="middle"
                  fontSize="11"
                  fill="var(--text)"
                  fontFamily="system-ui"
                >
                  {n.sub}
                </text>
              </g>
            ))}
          </svg>
        )}

        {/* BEFORE tree */}
        {mode === "before" && (
          <svg width="100%" viewBox="0 0 320 430" style={{ display: "block" }}>
            <defs>
              <marker
                id="redarrow"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path
                  d="M2 1L8 5L2 9"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="1.5"
                />
              </marker>
            </defs>
            <text
              x="160"
              y="18"
              textAnchor="middle"
              fontSize="11"
              fill="#ef4444"
              fontFamily="system-ui"
            >
              ⚠ user prop passed through every component
            </text>
            {propNodes.map((n, i) => (
              <g
                key={n.id}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setSelected(n.id);
                  setTourStep(null);
                }}
              >
                {i > 0 && (
                  <>
                    <line
                      x1="160"
                      y1={propNodes[i - 1].y + propNodes[i - 1].h}
                      x2="160"
                      y2={n.y - 2}
                      stroke="#ef4444"
                      strokeWidth="1.5"
                      markerEnd="url(#redarrow)"
                    />
                    <rect
                      x="110"
                      y={
                        (propNodes[i - 1].y + propNodes[i - 1].h + n.y) / 2 - 9
                      }
                      width="100"
                      height="16"
                      rx="4"
                      fill="var(--code-bg)"
                      stroke="rgba(239,68,68,0.35)"
                      strokeWidth="0.5"
                    />
                    <text
                      x="160"
                      y={
                        (propNodes[i - 1].y + propNodes[i - 1].h + n.y) / 2 + 4
                      }
                      textAnchor="middle"
                      fontSize="10"
                      fill="#ef4444"
                      fontFamily="monospace"
                    >
                      {"user={user}"}
                    </text>
                  </>
                )}
                <rect
                  x={n.x}
                  y={n.y}
                  width={n.w}
                  height={n.h}
                  rx="8"
                  fill={
                    activeNode === n.id
                      ? "rgba(239,68,68,0.15)"
                      : "rgba(239,68,68,0.06)"
                  }
                  stroke="#ef4444"
                  strokeWidth={activeNode === n.id ? "1.5" : "0.5"}
                  style={{ transition: "all 0.2s" }}
                />
                <text
                  x={n.x + n.w / 2}
                  y={n.y + 16}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="500"
                  fill="var(--text-h)"
                  fontFamily="system-ui"
                >
                  {n.label}
                </text>
                <text
                  x={n.x + n.w / 2}
                  y={n.y + 32}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#ef4444"
                  fontFamily="system-ui"
                >
                  {n.sub}
                </text>
              </g>
            ))}
          </svg>
        )}

        {/* Guided tour */}
        <div
          style={{
            ...s.card,
            borderColor: tourStep !== null ? "var(--accent)" : "var(--border)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "6px",
            }}
          >
            <p style={s.label}>Guided tour</p>
            {tourStep !== null && (
              <span style={{ fontSize: "11px", color: "var(--text)" }}>
                Step {tourStep + 1} of {TOUR.length}
              </span>
            )}
          </div>
          {tourStep !== null && (
            <p
              style={{
                fontSize: "12px",
                color: "var(--text-h)",
                marginBottom: "10px",
                lineHeight: "1.6",
              }}
            >
              <b>{TOUR[tourStep].node}:</b> {TOUR[tourStep].tip}
            </p>
          )}
          <button
            style={tourStep !== null ? s.btnActive : s.btn}
            onClick={nextTour}
          >
            {tourStep === null
              ? "▶ Start guided tour"
              : tourStep < TOUR.length - 1
                ? "Next →"
                : "✓ Finish tour"}
          </button>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={s.card}>
          <p style={s.label}>Edit context state live</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div>
              <p
                style={{
                  fontSize: "11px",
                  color: "var(--text)",
                  marginBottom: "4px",
                }}
              >
                name
              </p>
              <input
                style={s.input}
                value={user.name}
                onChange={(e) => updateUser("name", e.target.value)}
              />
            </div>
            <div>
              <p
                style={{
                  fontSize: "11px",
                  color: "var(--text)",
                  marginBottom: "4px",
                }}
              >
                email
              </p>
              <input
                style={s.input}
                value={user.email}
                onChange={(e) => updateUser("email", e.target.value)}
              />
            </div>
            <div>
              <p
                style={{
                  fontSize: "11px",
                  color: "var(--text)",
                  marginBottom: "4px",
                }}
              >
                themePreference
              </p>
              <select
                style={s.input}
                value={user.themePreference}
                onChange={(e) => updateUser("themePreference", e.target.value)}
              >
                <option value="dark">dark</option>
                <option value="light">light</option>
                <option value="system">system</option>
              </select>
            </div>
          </div>
        </div>

        <div style={s.card}>
          <p style={s.label}>
            UserContext value
            {pulse && (
              <span
                style={{
                  marginLeft: "8px",
                  color: "var(--accent)",
                  fontSize: "11px",
                }}
              >
                ● updated
              </span>
            )}
          </p>
          <pre style={s.pre}>{JSON.stringify({ user }, null, 2)}</pre>
        </div>

        <div style={s.card}>
          <p style={s.label}>Component inspector</p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "6px",
            }}
          >
            <span
              style={{
                fontSize: "13px",
                fontWeight: "500",
                color: "var(--text-h)",
              }}
            >
              {activeNode}
            </span>
            <span
              style={{
                background: node.badgeColor,
                color: "#fff",
                fontSize: "11px",
                padding: "2px 8px",
                borderRadius: "4px",
              }}
            >
              {node.badge}
            </span>
          </div>
          <p
            style={{
              fontSize: "11px",
              color: "var(--text)",
              marginBottom: "4px",
            }}
          >
            {node.file}
          </p>
          <p
            style={{
              fontSize: "12px",
              color: "var(--text-h)",
              marginBottom: "6px",
              lineHeight: "1.6",
            }}
          >
            {node.desc}
          </p>
          <div
            style={{
              background: "var(--accent-bg)",
              border: "1px solid var(--accent-border)",
              borderRadius: "8px",
              padding: "8px",
              marginBottom: "8px",
            }}
          >
            <p
              style={{
                fontSize: "11px",
                fontWeight: "500",
                color: "var(--accent)",
                marginBottom: "4px",
              }}
            >
              💡 Why this matters
            </p>
            <p
              style={{
                fontSize: "11px",
                color: "var(--text-h)",
                lineHeight: "1.6",
                margin: 0,
              }}
            >
              {node.why}
            </p>
          </div>
          <span
            style={{
              fontSize: "11px",
              color: "#ef4444",
              padding: "2px 8px",
              borderRadius: "4px",
              background: "rgba(239,68,68,0.1)",
            }}
          >
            Before
          </span>
          <pre style={{ ...s.pre, borderColor: "#ef4444", margin: "6px 0" }}>
            {node.before}
          </pre>
          <span
            style={{
              fontSize: "11px",
              padding: "2px 8px",
              borderRadius: "4px",
              background: "rgba(16,185,129,0.1)",
              color: "#10b981",
            }}
          >
            After
          </span>
          <pre style={{ ...s.pre, borderColor: "#10b981", marginTop: "6px" }}>
            {node.code}
          </pre>
        </div>

        <div style={s.card}>
          <p style={s.label}>UserProfile renders</p>
          <p
            style={{
              fontSize: "13px",
              color: "var(--text-h)",
              lineHeight: "1.8",
            }}
          >
            <b>Name:</b> {user.name}
            <br />
            <b>Email:</b> {user.email}
            <br />
            <b>Theme:</b> {user.themePreference}
          </p>
        </div>
      </div>
    </div>
  );
}
