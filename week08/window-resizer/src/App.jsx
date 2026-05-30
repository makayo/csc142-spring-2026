import { useState, useEffect, useRef, useCallback } from "react";

/* ── Breakpoints ─────────────────────────────── */
const BP = [
  {
    name: "xs",
    label: "Extra Small",
    min: 0,
    max: 479,
    device: "Smartphone · portrait",
    icon: "📱",
    bg: "#1c0505",
    accent: "#ef4444",
    muted: "#fca5a5",
    ring: "rgba(239,68,68,0.25)",
    bgAlpha: "rgba(239, 68, 68, 0.09)",
    tip: "Single column, bottom nav, no sidebar. Most modern smartphones in portrait mode (375–428px CSS width) land here. Tap targets must be ≥ 44px.",
    cols: 1,
    sidebar: false,
    topNav: false,
    bottomNav: true,
  },
  {
    name: "sm",
    label: "Small",
    min: 480,
    max: 767,
    device: "Large phone landscape · small tablet",
    icon: "📲",
    bg: "#1a0b20",
    accent: "#a855f7",
    muted: "#d8b4fe",
    ring: "rgba(168,85,247,0.25)",
    bgAlpha: "rgba(168, 85, 247, 0.09)",
    tip: "2-column grid unlocks. This is a large phone in landscape or a small tablet in portrait. Still no sidebar — bottom nav persists. Design for both thumb reach and slightly more horizontal space.",
    cols: 2,
    sidebar: false,
    topNav: false,
    bottomNav: true,
  },
  {
    name: "md",
    label: "Medium",
    min: 768,
    max: 1023,
    device: "Tablet",
    icon: "🗂️",
    bg: "#04111c",
    accent: "#0ea5e9",
    muted: "#7dd3fc",
    ring: "rgba(14,165,233,0.25)",
    bgAlpha: "rgba(14, 165, 233, 0.09)",
    tip: "Sidebar appears, navigation moves to the top, 3-column grid is now usable. This is the key layout hinge point — the first breakpoint where desktop-style patterns apply.",
    cols: 3,
    sidebar: true,
    topNav: true,
    bottomNav: false,
  },
  {
    name: "lg",
    label: "Large",
    min: 1024,
    max: 1279,
    device: "Laptop",
    icon: "💻",
    bg: "#051407",
    accent: "#22c55e",
    muted: "#86efac",
    ring: "rgba(34,197,94,0.25)",
    bgAlpha: "rgba(34, 197, 94, 0.09)",
    tip: "4-column grid, full sidebar, hover states become first-class interactions. Many laptops run a browser near this width — it's the most common desktop viewport.",
    cols: 4,
    sidebar: true,
    topNav: true,
    bottomNav: false,
  },
  {
    name: "xl",
    label: "Extra Large",
    min: 1280,
    max: 1535,
    device: "Desktop monitor",
    icon: "🖥️",
    bg: "#161004",
    accent: "#f59e0b",
    muted: "#fcd34d",
    ring: "rgba(245,158,11,0.25)",
    bgAlpha: "rgba(245, 158, 11, 0.09)",
    tip: "5-column grid. Cap your container at ~1200px max-width or text lines become too wide to read. Use the extra space for wider sidebars or secondary panels.",
    cols: 5,
    sidebar: true,
    topNav: true,
    bottomNav: false,
  },
  {
    name: "2xl",
    label: "2X Large",
    min: 1536,
    max: 1919,
    device: "Large desktop monitor",
    icon: "🖥️",
    bg: "#06060f",
    accent: "#6366f1",
    muted: "#a5b4fc",
    ring: "rgba(99,102,241,0.25)",
    bgAlpha: "rgba(99, 102, 241, 0.09)",
    tip: "6-column grid. Cap containers at ~1400px. Without a max-width, text lines can span 200+ characters — far beyond the readable 65–75 character ideal.",
    cols: 6,
    sidebar: true,
    topNav: true,
    bottomNav: false,
  },
  {
    name: "3xl",
    label: "3X Large",
    min: 1920,
    max: Infinity,
    device: "4K · Full HD · Cinema display",
    icon: "📺",
    bg: "#050f12",
    accent: "#06b6d4",
    muted: "#67e8f9",
    ring: "rgba(6,182,212,0.25)",
    bgAlpha: "rgba(6, 182, 212, 0.09)",
    tip: "1920px is the start of Full HD — the slider maximum. Consider a 3-panel layout: nav | content | context. No text column should exceed 800px. This breakpoint covers all screens 1920px and wider.",
    cols: 7,
    sidebar: true,
    topNav: true,
    bottomNav: false,
  },
];

const MIN_PX = 320;
// MAX_PX matches the 3xl min — dragging the slider all the way right lands on exactly
// 1920px, triggering 3xl. The full 3xl range is beyond what this tool simulates.
const MAX_PX = 1920;

function getBp(w) {
  for (let i = BP.length - 1; i >= 0; i--) if (w >= BP[i].min) return BP[i];
  return BP[0];
}

/* ── The resizing mock screen ────────────────── */
function MockScreen({ bp, previewWidth }) {
  const { cols, sidebar, topNav, bottomNav, accent, muted, bgAlpha } = bp;
  const cardCount = cols * 2;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: previewWidth,
        height: 220,
        background: "#111",
        borderRadius: "0 0 8px 8px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "max-width 0.05s linear",
        border: `1.5px solid ${accent}55`,
        borderTop: "none",
        fontFamily: "monospace",
        boxSizing: "border-box",
      }}
    >
      {/* Top nav */}
      {topNav && (
        <div
          style={{
            height: 28,
            background: "#1a1a1a",
            borderBottom: `1px solid ${accent}33`,
            display: "flex",
            alignItems: "center",
            padding: "0 10px",
            gap: 6,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: accent,
            }}
          />
          <div style={{ flex: 1, display: "flex", gap: 8 }}>
            {[40, 30, 45, 30].map((w, i) => (
              <div
                key={i}
                style={{
                  width: w,
                  height: 4,
                  borderRadius: 2,
                  background: i === 0 ? muted : "#333",
                }}
              />
            ))}
          </div>
          <div
            style={{
              width: 50,
              height: 16,
              borderRadius: 3,
              background: accent,
              opacity: 0.8,
            }}
          />
        </div>
      )}

      {/* Body */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {sidebar && (
          <div
            style={{
              width: 36,
              background: "#161616",
              borderRight: `1px solid ${accent}22`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: 8,
              gap: 8,
              flexShrink: 0,
            }}
          >
            {[accent, "#2a2a2a", "#2a2a2a", "#2a2a2a"].map((c, i) => (
              <div
                key={i}
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 4,
                  background: c,
                  opacity: i === 0 ? 1 : 0.5,
                }}
              />
            ))}
          </div>
        )}

        {/* Content */}
        <div style={{ flex: 1, padding: 8, overflow: "hidden" }}>
          <div
            style={{
              marginBottom: 8,
              padding: "6px 8px",
              borderLeft: `3px solid ${accent}`,
              background: bgAlpha,
              borderRadius: "0 4px 4px 0",
            }}
          >
            <div
              style={{
                width: "50%",
                height: 6,
                borderRadius: 2,
                background: muted,
                marginBottom: 4,
              }}
            />
            <div
              style={{
                width: "80%",
                height: 3,
                borderRadius: 2,
                background: "#333",
              }}
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${cols}, 1fr)`,
              gap: 5,
            }}
          >
            {Array.from({ length: cardCount }).map((_, i) => (
              <div
                key={i}
                style={{
                  background: "#1c1c1c",
                  borderRadius: 4,
                  padding: "6px",
                  border: "1px solid #252525",
                }}
              >
                <div
                  style={{
                    width: "60%",
                    height: 4,
                    borderRadius: 2,
                    background: i % 4 === 0 ? accent : "#2d2d2d",
                    marginBottom: 4,
                  }}
                />
                <div
                  style={{
                    width: "100%",
                    height: 3,
                    borderRadius: 2,
                    background: "#2a2a2a",
                    marginBottom: 2,
                  }}
                />
                <div
                  style={{
                    width: "75%",
                    height: 3,
                    borderRadius: 2,
                    background: "#2a2a2a",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      {bottomNav && (
        <div
          style={{
            height: 30,
            background: "#1a1a1a",
            borderTop: `1px solid ${accent}33`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            flexShrink: 0,
          }}
        >
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 3,
                  background: i === 0 ? accent : "#2d2d2d",
                }}
              />
              <div
                style={{
                  width: 18,
                  height: 2,
                  borderRadius: 1,
                  background: "#2d2d2d",
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Main App ────────────────────────────────── */
export default function App() {
  // ── REQUIREMENT 1: Real-Time State Tracking ──────────────────────────────
  // windowSize holds the current width and height, updated on every resize event.
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1024,
    height: typeof window !== "undefined" ? window.innerHeight : 768,
  });

  const [synced, setSynced] = useState(true);
  const [dragging, setDragging] = useState(false);
  const [flash, setFlash] = useState(false);

  const prevBpName = useRef(null);
  const sliderRef = useRef(null);
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(600);

  // Measure container for preview scaling
  useEffect(() => {
    const ro = new ResizeObserver((entries) => {
      if (entries[0]) setContainerWidth(entries[0].contentRect.width);
    });
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // ── REQUIREMENT 2 & 3: Event Listener + Cleanup ──────────────────────────
  useEffect(() => {
    if (!synced) return;

    // REQUIREMENT 1 — handler reads both dimensions and pushes them into state.
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    // REQUIREMENT 2 — attach the handler to the window resize event.
    window.addEventListener("resize", handleResize);

    // REQUIREMENT 3 — cleanup removes the listener when the component unmounts
    // or when synced changes, preventing stale handlers and memory leaks.
    return () => window.removeEventListener("resize", handleResize);

    // DEPENDENCY ARRAY NOTE: [synced] is the only dependency because this effect
    // only needs to re-run when the user toggles between synced and manual mode.
    // Without any dependency array, the effect would re-run on every render,
    // stacking duplicate event listeners and causing unpredictable resize behaviour.
  }, [synced]);

  const simWidth = windowSize.width;
  const bp = getBp(simWidth);

  // Flash on bp change
  useEffect(() => {
    if (prevBpName.current && prevBpName.current !== bp.name) {
      setFlash(true);
      const t = setTimeout(() => setFlash(false), 500);
      return () => clearTimeout(t);
    }
    prevBpName.current = bp.name;
  }, [bp.name]);

  const pct = Math.min(Math.max((simWidth - MIN_PX) / (MAX_PX - MIN_PX), 0), 1);

  const MIN_PREVIEW = containerWidth * 0.15;
  const previewWidth = Math.min(
    MIN_PREVIEW + pct * (containerWidth - MIN_PREVIEW),
    containerWidth,
  );

  const pxFromPointer = useCallback((clientX) => {
    const rect = sliderRef.current?.getBoundingClientRect();
    if (!rect) return MIN_PX;
    const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
    return Math.round(MIN_PX + ratio * (MAX_PX - MIN_PX));
  }, []);

  // Global pointer events during drag
  useEffect(() => {
    if (!dragging) return;

    const handlePointerMove = (e) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setWindowSize((prev) => ({ ...prev, width: pxFromPointer(e.clientX) }));
      });
    };

    const handlePointerUp = (e) => {
      setDragging(false);
      try {
        sliderRef.current?.releasePointerCapture(e.pointerId);
      } catch (_) {}
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [dragging, pxFromPointer]);

  const onDown = (e) => {
    e.preventDefault();
    setSynced(false);
    setDragging(true);
    setWindowSize((prev) => ({ ...prev, width: pxFromPointer(e.clientX) }));
    try {
      e.target.setPointerCapture(e.pointerId);
    } catch (_) {}
  };

  return (
    <div
      style={{
        width: "100%",
        boxSizing: "border-box",
        minHeight: "100vh",
        background: bp.bg,
        transition: "background 0.5s",
        fontFamily: "'Courier New', monospace",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem 1.25rem 3rem",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* Background glow — position absolute so overflow:hidden clips it */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 500,
          height: 350,
          background: bp.ring,
          filter: "blur(100px)",
          borderRadius: "50%",
          pointerEvents: "none",
          transition: "background 0.5s",
          zIndex: 0,
        }}
      />

      <div
        ref={containerRef}
        style={{
          width: "100%",
          maxWidth: 640,
          position: "relative",
          zIndex: 1,
          boxSizing: "border-box",
        }}
      >
        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.2em",
              color: bp.muted,
              marginBottom: 6,
              textTransform: "uppercase",
            }}
          >
            CSS Breakpoint Explorer
          </div>
          <div
            style={{
              fontSize: "clamp(1.8rem, 7vw, 3.5rem)",
              fontWeight: 700,
              color: bp.accent,
              letterSpacing: "-1px",
              lineHeight: 1,
              transform: flash ? "scale(1.05)" : "scale(1)",
              transition: "color 0.4s, transform 0.3s",
            }}
          >
            {bp.icon} {bp.label}
          </div>
          <div
            style={{
              fontSize: 13,
              color: bp.muted,
              marginTop: 6,
              opacity: 0.8,
            }}
          >
            {bp.device} ·{" "}
            {bp.max === Infinity ? `${bp.min}px+` : `${bp.min}–${bp.max}px`}
          </div>
        </div>

        {/* ── SLIDER ─────────────────────────────── */}
        <div style={{ marginBottom: "0.5rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <span
              style={{
                fontSize: 11,
                color: bp.muted,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              ← drag to simulate width →
            </span>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                <span
                  style={{
                    fontSize: 10,
                    color: bp.muted,
                    textTransform: "uppercase",
                  }}
                >
                  W
                </span>
                <span
                  style={{
                    fontSize: 28,
                    fontWeight: 700,
                    color: bp.accent,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {windowSize.width}
                </span>
                <span style={{ fontSize: 13, color: bp.muted }}>px</span>
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                <span
                  style={{
                    fontSize: 10,
                    color: bp.muted,
                    textTransform: "uppercase",
                  }}
                >
                  H
                </span>
                <span
                  style={{
                    fontSize: 28,
                    fontWeight: 700,
                    color: bp.muted,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {windowSize.height}
                </span>
                <span style={{ fontSize: 13, color: bp.muted }}>px</span>
              </div>
            </div>
          </div>

          {/* Track */}
          <div
            ref={sliderRef}
            onPointerDown={onDown}
            style={{
              position: "relative",
              height: 44,
              display: "flex",
              alignItems: "center",
              cursor: dragging ? "grabbing" : "grab",
              touchAction: "none",
            }}
          >
            {/* Rail */}
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                height: 6,
                borderRadius: 3,
                background: "rgba(255,255,255,0.07)",
              }}
            />

            {/* Fill */}
            <div
              style={{
                position: "absolute",
                left: 0,
                width: `${pct * 100}%`,
                height: 6,
                borderRadius: 3,
                background: bp.accent,
                boxShadow: `0 0 16px ${bp.ring}`,
                transition: dragging
                  ? "none"
                  : "width 0.1s, background 0.5s, box-shadow 0.5s",
              }}
            />

            {/* Breakpoint ticks */}
            {BP.filter((b) => b.min > MIN_PX && b.min < MAX_PX).map((b) => {
              const tp = ((b.min - MIN_PX) / (MAX_PX - MIN_PX)) * 100;
              const passed = simWidth >= b.min;
              return (
                <div
                  key={b.name}
                  style={{
                    position: "absolute",
                    left: `${tp}%`,
                    top: 0,
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    pointerEvents: "none",
                  }}
                >
                  <div
                    style={{
                      width: 2,
                      height: passed ? 18 : 12,
                      background: passed ? b.accent : "rgba(255,255,255,0.12)",
                      borderRadius: 1,
                      transition: "height 0.2s, background 0.3s",
                    }}
                  />
                </div>
              );
            })}

            {/* Thumb */}
            <div
              style={{
                position: "absolute",
                left: `clamp(0%, ${pct * 100}%, 100%)`,
                transform: "translateX(-50%)",
                width: dragging ? 28 : 22,
                height: dragging ? 28 : 22,
                borderRadius: "50%",
                background: "#fff",
                border: `3px solid ${bp.accent}`,
                boxShadow: `0 0 0 ${dragging ? 8 : 4}px ${bp.ring}`,
                transition: dragging
                  ? "none"
                  : "left 0.05s, width 0.1s, height 0.1s, border-color 0.5s, box-shadow 0.5s",
                pointerEvents: "none",
                zIndex: 2,
              }}
            />
          </div>

          {/* Tick labels */}
          <div style={{ position: "relative", height: 18, marginTop: 2 }}>
            {[
              MIN_PX,
              ...BP.filter((b) => b.min > MIN_PX && b.min < MAX_PX).map(
                (b) => b.min,
              ),
              MAX_PX,
            ].map((stop) => {
              const tp = ((stop - MIN_PX) / (MAX_PX - MIN_PX)) * 100;
              return (
                <span
                  key={stop}
                  style={{
                    position: "absolute",
                    left: `${tp}%`,
                    transform: "translateX(-50%)",
                    fontSize: 9,
                    color: "rgba(255,255,255,0.25)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {stop}
                </span>
              );
            })}
          </div>
        </div>

        {/* Breakpoint jump pills */}
        <div
          style={{
            display: "flex",
            gap: 6,
            flexWrap: "wrap",
            marginBottom: "2rem",
            marginTop: "0.5rem",
          }}
        >
          {BP.map((b) => {
            const active = b.name === bp.name;
            return (
              <button
                key={b.name}
                onClick={() => {
                  setSynced(false);
                  setWindowSize((prev) => ({
                    ...prev,
                    width: b.min === 0 ? MIN_PX : b.min,
                  }));
                }}
                style={{
                  padding: "5px 12px",
                  borderRadius: 5,
                  fontSize: 11,
                  fontFamily: "'Courier New', monospace",
                  fontWeight: 700,
                  border: `1.5px solid ${active ? b.accent : "rgba(255,255,255,0.1)"}`,
                  background: active ? b.bgAlpha : "transparent",
                  color: active ? b.accent : "rgba(255,255,255,0.3)",
                  cursor: "pointer",
                  transform: active ? "translateY(-1px)" : "none",
                  boxShadow: active ? `0 4px 14px ${b.ring}` : "none",
                  transition: "all 0.2s",
                }}
              >
                {b.name}
              </button>
            );
          })}
          <button
            onClick={() => {
              setSynced(true);
              setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
              });
            }}
            style={{
              marginLeft: "auto",
              padding: "5px 12px",
              borderRadius: 5,
              fontSize: 11,
              fontFamily: "'Courier New', monospace",
              border: `1.5px solid ${synced ? bp.accent : "rgba(255,255,255,0.1)"}`,
              background: synced ? bp.bgAlpha : "transparent",
              color: synced ? bp.accent : "rgba(255,255,255,0.3)",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            ⟳ sync window
          </button>
        </div>

        {/* ── PREVIEW SCREEN ─────────────────────── */}
        <div style={{ marginBottom: "2rem" }}>
          <div
            style={{
              fontSize: 11,
              color: bp.muted,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            Live layout preview
          </div>

          {/* Browser chrome bar */}
          <div
            style={{
              width: "100%",
              maxWidth: previewWidth,
              background: "#1a1a1a",
              borderRadius: "8px 8px 0 0",
              border: `1.5px solid ${bp.accent}55`,
              borderBottom: "none",
              padding: "6px 10px",
              display: "flex",
              alignItems: "center",
              gap: 6,
              transition: "max-width 0.05s linear, border-color 0.5s",
              boxSizing: "border-box",
            }}
          >
            {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
              <div
                key={c}
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: "50%",
                  background: c,
                  opacity: 0.7,
                  flexShrink: 0,
                }}
              />
            ))}
            <div
              style={{
                flex: 1,
                height: 14,
                background: "#2a2a2a",
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
                paddingLeft: 6,
                overflow: "hidden",
              }}
            >
              <span
                style={{ fontSize: 8, color: "#555", whiteSpace: "nowrap" }}
              >
                your-site.com
              </span>
            </div>
            <span
              style={{
                fontSize: 9,
                color: bp.accent,
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {simWidth}px
            </span>
          </div>

          <MockScreen bp={bp} previewWidth={previewWidth} />

          {/* Layout callout */}
          <div
            style={{
              marginTop: 10,
              padding: "8px 12px",
              background: bp.bgAlpha,
              border: `1px solid ${bp.accent}33`,
              borderRadius: 6,
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            {[
              { label: "sidebar", val: bp.sidebar ? "✓ visible" : "✗ hidden" },
              { label: "top nav", val: bp.topNav ? "✓ visible" : "✗ hidden" },
              {
                label: "bottom nav",
                val: bp.bottomNav ? "✓ visible" : "✗ hidden",
              },
              {
                label: "columns",
                val: `${bp.cols} col${bp.cols > 1 ? "s" : ""}`,
              },
            ].map(({ label, val }) => (
              <div key={label}>
                <div
                  style={{
                    fontSize: 9,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: bp.muted,
                    marginBottom: 1,
                  }}
                >
                  {label}
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: bp.muted }}>
                  {val}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Design tip */}
        <div
          style={{
            padding: "1rem 1.25rem",
            borderLeft: `3px solid ${bp.accent}`,
            background: bp.bgAlpha,
            borderRadius: "0 8px 8px 0",
            marginBottom: "1.5rem",
            transition: "border-color 0.4s, background 0.4s",
          }}
        >
          <div
            style={{
              fontSize: 10,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: bp.muted,
              marginBottom: 6,
            }}
          >
            Design tip
          </div>
          <p
            style={{ fontSize: 14, lineHeight: 1.7, color: "#ddd", margin: 0 }}
          >
            {bp.tip}
          </p>
        </div>

        {/* CSS snippet */}
        <div
          style={{
            fontSize: 10,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: bp.muted,
            marginBottom: 8,
          }}
        >
          CSS media query
        </div>
        <pre
          style={{
            padding: "1rem 1.25rem",
            background: "#0a0a0a",
            border: `1px solid ${bp.accent}33`,
            borderRadius: 8,
            fontFamily: "'Courier New', monospace",
            fontSize: 12,
            lineHeight: 1.9,
            color: "#666",
            margin: 0,
            overflowX: "auto",
            transition: "border-color 0.4s",
            boxSizing: "border-box",
            width: "100%",
          }}
        >
          {bp.min === 0 ? (
            <>
              <span style={{ color: "rgba(255,255,255,0.25)" }}>
                {
                  "/* xs — mobile-first base styles.\n   No media query needed.\n   All other breakpoints build on top of these. */"
                }
              </span>
              {"\n"}
              <span style={{ color: bp.muted }}>.layout</span>
              {`   { flex-direction: column }\n`}
              <span style={{ color: bp.muted }}>.sidebar</span>
              {`  { display: none }\n`}
              <span style={{ color: bp.muted }}>.nav</span>
              {`      { position: fixed; bottom: 0 }\n`}
              <span style={{ color: bp.muted }}>.grid</span>
              {`     { grid-template-columns: 1fr }`}
            </>
          ) : (
            <>
              <span
                style={{ color: bp.accent, fontWeight: 700 }}
              >{`@media (min-width: ${bp.min}px)`}</span>
              {` {\n`}
              {bp.name === "sm" && (
                <>
                  <span style={{ color: bp.muted }}>{"  .grid"}</span>
                  {`     { grid-template-columns: repeat(2, 1fr) }\n`}
                </>
              )}
              {bp.name === "md" && (
                <>
                  <span style={{ color: bp.muted }}>{"  .layout"}</span>
                  {`   { flex-direction: row }\n`}
                  <span style={{ color: bp.muted }}>{"  .sidebar"}</span>
                  {`  { display: block; width: 72px }\n`}
                  <span style={{ color: bp.muted }}>{"  .nav"}</span>
                  {`      { position: static; top: 0 }\n`}
                  <span style={{ color: bp.muted }}>{"  .grid"}</span>
                  {`     { grid-template-columns: repeat(3, 1fr) }\n`}
                </>
              )}
              {bp.name === "lg" && (
                <>
                  <span style={{ color: bp.muted }}>{"  .sidebar"}</span>
                  {`  { width: 240px }\n`}
                  <span style={{ color: bp.muted }}>{"  .grid"}</span>
                  {`     { grid-template-columns: repeat(4, 1fr) }\n`}
                </>
              )}
              {bp.name === "xl" && (
                <>
                  <span style={{ color: bp.muted }}>{"  .container"}</span>
                  {` { max-width: 1200px; margin: 0 auto }\n`}
                  <span style={{ color: bp.muted }}>{"  .grid"}</span>
                  {`     { grid-template-columns: repeat(5, 1fr) }\n`}
                </>
              )}
              {bp.name === "2xl" && (
                <>
                  <span style={{ color: bp.muted }}>{"  .container"}</span>
                  {` { max-width: 1400px }\n`}
                  <span style={{ color: bp.muted }}>{"  .grid"}</span>
                  {`     { grid-template-columns: repeat(6, 1fr) }\n`}
                </>
              )}
              {bp.name === "3xl" && (
                <>
                  <span style={{ color: bp.muted }}>{"  .layout"}</span>
                  {`   { grid-template-columns: 280px 1fr 320px }\n`}
                  <span style={{ color: bp.muted }}>{"  .grid"}</span>
                  {`     { grid-template-columns: repeat(7, 1fr) }\n`}
                  <span style={{ color: bp.muted }}>{"  .container"}</span>
                  {` { max-width: 1600px }\n`}
                </>
              )}
              {`}`}
            </>
          )}
        </pre>
      </div>
    </div>
  );
}
