import { useState, useEffect } from "react";
import "./App.css";
import useWindowSize from "./hooks/useWindowSize";

const MOBILE_MAX = 767;
const TABLET_MAX = 1023;

function getLayout(width) {
  if (width <= MOBILE_MAX) return "mobile";
  if (width <= TABLET_MAX) return "tablet";
  return "desktop";
}

const TEST_CASES = [
  {
    id: 1,
    type: "normal",
    label: "Normal 1",
    name: "Initial desktop load",
    instruction: "Expand window to ≥1024px wide",
    check: (w) => w >= 1024,
    expected: "Width ≥ 1024px — Desktop Layout appears.",
  },
  {
    id: 2,
    type: "normal",
    label: "Normal 2",
    name: "Tablet width",
    instruction: "Resize window to 768–1023px wide",
    check: (w) => w >= 768 && w <= 1023,
    expected: "Width 768–1023px — Tablet Layout appears.",
  },
  {
    id: 3,
    type: "normal",
    label: "Normal 3",
    name: "Desktop → Mobile width",
    instruction: "Resize window to below 768px",
    check: (w) => w < 768,
    expected: "Width < 768px — Layout switches to Mobile.",
  },
  {
    id: 4,
    type: "edge",
    label: "Edge 1",
    name: "Extremely narrow (~300px)",
    instruction: "Resize window to ~300px wide",
    check: (w) => w <= 350,
    expected: "Width ≤ 350px — App stays functional, Mobile Layout shown.",
  },
  {
    id: 5,
    type: "edge",
    label: "Edge 2",
    name: "Very wide monitor (1920px+)",
    instruction: "Expand window to 1920px or full screen",
    check: (w) => w >= 1920,
    expected: "Width ≥ 1920px — Desktop Layout remains displayed.",
  },
  {
    id: 6,
    type: "edge",
    label: "Edge 3",
    name: "Rapid continuous resizing",
    instruction: "Quickly drag window back and forth several times",
    check: null,
    expected: "No crashes or errors during rapid resizing.",
  },
];

export default function App() {
  const { width, height } = useWindowSize();
  const layout = getLayout(width);
  const [passed, setPassed] = useState({});

  useEffect(() => {
    setPassed((prev) => {
      const next = { ...prev };
      TEST_CASES.forEach((tc) => {
        if (tc.check && tc.check(width)) next[tc.id] = true;
      });
      return next;
    });
  }, [width]);

  function confirmManual(id) {
    setPassed((prev) => ({ ...prev, [id]: true }));
  }

  function resetAll() {
    setPassed({});
  }

  const passCount = Object.values(passed).filter(Boolean).length;

  return (
    <div className="app">
      <header className="header">
        <span className="logo">▶ StreamView</span>
        <span className="badge">{layout}</span>
      </header>

      <main className="main">
        <h1 className="title">Window Size Tracker</h1>
        <p className="subtitle">Custom React Hook · useWindowSize</p>

        <div className="dimensions">
          <div className="dim-card">
            <span className="dim-label">Width</span>
            <span className="dim-value">
              {width}
              <span className="dim-unit">px</span>
            </span>
          </div>
          <div className="dim-card">
            <span className="dim-label">Height</span>
            <span className="dim-value">
              {height}
              <span className="dim-unit">px</span>
            </span>
          </div>
          <div className="dim-card">
            <span className="dim-label">Layout</span>
            <span className="dim-value layout-value">
              {layout === "mobile" && "📱 Mobile"}
              {layout === "tablet" && "⬛ Tablet"}
              {layout === "desktop" && "💻 Desktop"}
            </span>
          </div>
        </div>

        <div className="panel" data-layout={layout}>
          {layout === "mobile" && (
            <>
              <h2>Mobile Layout</h2>
              <p>
                Compact single-column streaming view. Width ≤ {MOBILE_MAX}px.
              </p>
              <div className="stream-grid mobile-grid">
                {["Ep 1", "Ep 2", "Ep 3"].map((ep) => (
                  <div className="stream-card" key={ep}>
                    {ep}
                  </div>
                ))}
              </div>
            </>
          )}
          {layout === "tablet" && (
            <>
              <h2>Tablet Layout</h2>
              <p>
                Two-column mid-size view. Width {MOBILE_MAX + 1}–{TABLET_MAX}px.
              </p>
              <div className="stream-grid tablet-grid">
                {["Ep 1", "Ep 2", "Ep 3", "Ep 4"].map((ep) => (
                  <div className="stream-card" key={ep}>
                    {ep}
                  </div>
                ))}
              </div>
            </>
          )}
          {layout === "desktop" && (
            <>
              <h2>Desktop Layout</h2>
              <p>
                Full-size multi-column streaming view. Width ≥ {TABLET_MAX + 1}
                px.
              </p>
              <div className="stream-grid desktop-grid">
                {["Ep 1", "Ep 2", "Ep 3", "Ep 4", "Ep 5", "Ep 6"].map((ep) => (
                  <div className="stream-card" key={ep}>
                    {ep}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="breakpoints" style={{ marginBottom: "2.5rem" }}>
          <span className={layout === "mobile" ? "bp active" : "bp"}>
            Mobile ≤767px
          </span>
          <span className={layout === "tablet" ? "bp active" : "bp"}>
            Tablet 768–1023px
          </span>
          <span className={layout === "desktop" ? "bp active" : "bp"}>
            Desktop ≥1024px
          </span>
        </div>

        <div className="test-panel">
          <div className="test-panel-header">
            <div>
              <h2 className="test-panel-title">Test Cases</h2>
              <p className="test-panel-sub">
                Resize the browser — tests auto-pass when the condition is met.{" "}
                {passCount}/6 passing.
              </p>
            </div>
            <button className="reset-btn" onClick={resetAll}>
              ↺ Reset all
            </button>
          </div>

          <div className="test-section-label">Normal Cases</div>
          <div className="test-list">
            {TEST_CASES.filter((tc) => tc.type === "normal").map((tc) => (
              <TestRow
                key={tc.id}
                tc={tc}
                passed={passed[tc.id]}
                currentWidth={width}
                onConfirm={() => confirmManual(tc.id)}
              />
            ))}
          </div>

          <div className="test-section-label" style={{ marginTop: "1.25rem" }}>
            Edge Cases
          </div>
          <div className="test-list">
            {TEST_CASES.filter((tc) => tc.type === "edge").map((tc) => (
              <TestRow
                key={tc.id}
                tc={tc}
                passed={passed[tc.id]}
                currentWidth={width}
                onConfirm={() => confirmManual(tc.id)}
              />
            ))}
          </div>

          {passCount === 6 && (
            <div className="all-pass">✅ All 6 test cases passed!</div>
          )}
        </div>
      </main>
    </div>
  );
}

function TestRow({ tc, passed, currentWidth, onConfirm }) {
  const active = tc.check ? tc.check(currentWidth) : false;

  return (
    <div
      className={`test-row ${passed ? "test-row--passed" : ""} ${active && !passed ? "test-row--active" : ""}`}
    >
      <div className="test-row-top">
        <span className="test-id">{tc.label}</span>
        <span className="test-name">{tc.name}</span>
        <span
          className={`test-result ${passed ? "test-result--pass" : active ? "test-result--active" : ""}`}
        >
          {passed ? "✅ Passed" : active ? "🟡 Met now" : "—"}
        </span>
        {!tc.check && !passed && (
          <button className="run-btn confirm-btn" onClick={onConfirm}>
            ✓ Confirm
          </button>
        )}
      </div>
      <p className="test-instruction">
        <span className="test-expected-label">Do: </span>
        {tc.instruction}
      </p>
      <p className="test-expected">
        <span className="test-expected-label">Expected: </span>
        {tc.expected}
      </p>
    </div>
  );
}
