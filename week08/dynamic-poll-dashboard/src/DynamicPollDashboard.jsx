import { useState, useRef, useEffect, useCallback } from "react";
import Chart from "chart.js/auto";

// ─── Constants ────────────────────────────────────────────────────────────────

const FRAMEWORKS = [
  { name: "React", color: "#3b82f6", border: "#2563eb" },
  { name: "Vue", color: "#22c55e", border: "#16a34a" },
  { name: "Angular", color: "#ef4444", border: "#dc2626" },
];

const initialVotes = () =>
  Object.fromEntries(FRAMEWORKS.map((f) => [f.name, 0]));

function fmt(d) {
  return d.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

// ─── Subcomponents ────────────────────────────────────────────────────────────

function MetricCard({ label, value, small }) {
  return (
    <div style={styles.metricCard}>
      <div style={styles.metricLabel}>{label}</div>
      <div style={{ ...styles.metricValue, fontSize: small ? 15 : 22 }}>
        {value}
      </div>
    </div>
  );
}

function VoteButton({ framework, count, total, onVote }) {
  const pct = total ? Math.round((count / total) * 100) : 0;
  const max = Math.max(total, 1);
  const barW = Math.round((count / max) * 100);

  return (
    <button
      onClick={() => onVote(framework.name)}
      aria-label={`Vote for ${framework.name}, currently ${count} votes`}
      style={styles.voteBtn}
    >
      <span style={{ ...styles.vbDot, background: framework.color }} />
      <span style={styles.vbName}>{framework.name}</span>
      <span style={styles.vbCount}>
        {count} vote{count !== 1 ? "s" : ""} · {pct}%
      </span>
      <span
        style={{
          ...styles.vbBar,
          background: framework.color,
          width: `${barW}%`,
        }}
      />
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function DynamicPollDashboard() {
  const [votes, setVotes] = useState(initialVotes);
  const [log, setLog] = useState([]);
  const [elapsed, setElapsed] = useState(0);

  const canvasRef = useRef(null);
  // REQUIREMENT 1 — chartInstanceRef holds the Chart.js instance so we can
  // check whether it already exists before creating a new one.
  const chartInstanceRef = useRef(null);
  const startRef = useRef(Date.now());

  // ── REQUIREMENTS 1, 2, 3 & 4 ─────────────────────────────────────────────
  useEffect(() => {
    // REQUIREMENT 1 — Imperative Instantiation:
    // Check if chartInstanceRef.current is empty. If it is, create the chart.
    if (!chartInstanceRef.current) {
      chartInstanceRef.current = new Chart(canvasRef.current, {
        type: "bar",
        data: {
          labels: FRAMEWORKS.map((f) => f.name),
          datasets: [
            {
              label: "Votes",
              data: FRAMEWORKS.map((f) => votes[f.name]),
              backgroundColor: FRAMEWORKS.map((f) => f.color + "33"),
              borderColor: FRAMEWORKS.map((f) => f.border),
              borderWidth: 1.5,
              borderRadius: 6,
              borderSkipped: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 250 },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { stepSize: 1, precision: 0 },
              grid: { color: "rgba(128,128,128,0.08)" },
              border: { display: false },
            },
            x: {
              grid: { display: false },
              border: { display: false },
            },
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) => {
                  const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
                  const pct = total ? Math.round((ctx.raw / total) * 100) : 0;
                  return ` ${ctx.raw} vote${ctx.raw !== 1 ? "s" : ""} — ${pct}%`;
                },
              },
            },
          },
        },
      });
    } else {
      // REQUIREMENT 2 — State Synchronization:
      // The chart instance already exists — do NOT create a new one.
      // Mutate the existing data array directly and call .update().
      chartInstanceRef.current.data.datasets[0].data = FRAMEWORKS.map(
        (f) => votes[f.name],
      );
      chartInstanceRef.current.update("active");
    }

    // ❗ If we created a new Chart() on every render without destroying the old
    // one, Chart.js would stack multiple contexts and event listeners on the
    // same canvas, causing memory leaks and "Canvas is already in use" errors.

    // REQUIREMENT 3 — Cleanup Execution:
    // Destroy the chart instance on unmount to remove event listeners and free
    // the cached canvas context.
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [votes]); // re-runs on every vote so the else branch keeps the chart in sync

  // ── Session timer ───────────────────────────────────────────────────────────
  useEffect(() => {
    const id = setInterval(
      () => setElapsed(Math.floor((Date.now() - startRef.current) / 1000)),
      1000,
    );
    return () => clearInterval(id);
  }, []);

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleVote = useCallback((name) => {
    setVotes((prev) => ({ ...prev, [name]: prev[name] + 1 }));
    setLog((prev) => [...prev, { name, time: fmt(new Date()) }]);
  }, []);

  const handleReset = useCallback(() => {
    setVotes(initialVotes());
    setLog([]);
    startRef.current = Date.now();
    setElapsed(0);
  }, []);

  // ── Derived values ──────────────────────────────────────────────────────────
  const total = Object.values(votes).reduce((a, b) => a + b, 0);
  const sorted = FRAMEWORKS.map((f) => ({
    name: f.name,
    v: votes[f.name],
  })).sort((a, b) => b.v - a.v);

  const isTied = total > 0 && sorted[0].v === sorted[1].v;
  const leader = total === 0 ? "—" : isTied ? "Tied" : sorted[0].name;
  const margin =
    total === 0 ? "—" : isTied ? "Tied" : `+${sorted[0].v - sorted[1].v}`;

  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;
  const sessionLabel = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;

  return (
    <div style={styles.shell}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.h1}>Developer framework poll</h1>
        <p style={styles.sub}>
          Click a framework to cast your vote. Results update in real time.
        </p>
      </div>

      {/* Metric cards */}
      <div style={styles.metricsGrid}>
        <MetricCard label="Total votes" value={total} />
        <MetricCard label="Leading framework" value={leader} small />
        <MetricCard label="Lead margin" value={margin} />
        <MetricCard label="Session time" value={sessionLabel} small />
      </div>

      {/* Chart card */}
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <span style={styles.cardTitle}>Vote distribution</span>
          <span style={styles.liveTag}>
            <span style={styles.liveDot} />
            Live
          </span>
        </div>

        <div style={styles.legend}>
          {FRAMEWORKS.map((f) => {
            const pct = total ? Math.round((votes[f.name] / total) * 100) : 0;
            return (
              <span key={f.name} style={styles.legendItem}>
                <span style={{ ...styles.legendSq, background: f.color }} />
                {f.name} — {votes[f.name]} ({pct}%)
              </span>
            );
          })}
        </div>

        <div style={{ position: "relative", height: 200 }}>
          <canvas
            ref={canvasRef}
            role="img"
            aria-label="Bar chart showing votes per JavaScript framework"
          />
        </div>
      </div>

      {/* Vote card */}
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <span style={styles.cardTitle}>Cast your vote</span>
        </div>

        <div style={styles.voteGrid}>
          {FRAMEWORKS.map((f) => (
            <VoteButton
              key={f.name}
              framework={f}
              count={votes[f.name]}
              total={total}
              onVote={handleVote}
            />
          ))}
        </div>

        <div style={styles.actions}>
          <span style={styles.lastVote}>
            {log.length === 0
              ? "No votes yet"
              : `Last vote: ${log[log.length - 1].name} at ${log[log.length - 1].time}`}
          </span>
          <button
            onClick={handleReset}
            style={styles.resetBtn}
            aria-label="Reset all votes"
          >
            ↺ Reset
          </button>
        </div>

        <div style={styles.historyWrap}>
          <div style={styles.historyTitle}>Recent activity</div>
          <div style={styles.logList}>
            {log.length === 0 ? (
              <div style={styles.emptyMsg}>Votes will appear here</div>
            ) : (
              [...log]
                .reverse()
                .slice(0, 12)
                .map((entry, i) => {
                  const f = FRAMEWORKS.find((x) => x.name === entry.name);
                  return (
                    <div key={i} style={styles.logItem}>
                      <span style={{ ...styles.logDot, background: f.color }} />
                      <span style={styles.logTime}>{entry.time}</span>
                      <span>{entry.name} received a vote</span>
                    </div>
                  );
                })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = {
  shell: {
    width: 560,
    margin: "24px auto",
    fontFamily: "system-ui, sans-serif",
  },
  header: { marginBottom: "1.5rem" },
  h1: { fontSize: 20, fontWeight: 500, margin: "0 0 4px" },
  sub: { fontSize: 13, color: "#6b7280", margin: 0 },
  metricsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: 10,
    marginBottom: "1.25rem",
  },
  metricCard: { background: "#f9fafb", borderRadius: 8, padding: "14px 16px" },
  metricLabel: {
    fontSize: 11,
    color: "#9ca3af",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  metricValue: { fontWeight: 500, color: "#111827", lineHeight: 1 },
  card: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: "1.25rem",
    marginBottom: "1rem",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1rem",
  },
  cardTitle: { fontSize: 14, fontWeight: 500, color: "#111827" },
  liveTag: {
    fontSize: 11,
    color: "#6b7280",
    display: "flex",
    alignItems: "center",
    gap: 5,
  },
  liveDot: { width: 7, height: 7, borderRadius: "50%", background: "#22c55e" },
  legend: {
    display: "flex",
    gap: 16,
    marginBottom: "0.75rem",
    flexWrap: "wrap",
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    fontSize: 12,
    color: "#6b7280",
  },
  legendSq: { width: 10, height: 10, borderRadius: 2, flexShrink: 0 },
  voteGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: 10,
    marginBottom: "0.75rem",
  },
  voteBtn: {
    border: "1px solid #e5e7eb",
    borderRadius: 10,
    padding: "14px 12px",
    background: "#fff",
    cursor: "pointer",
    textAlign: "left",
    position: "relative",
    overflow: "hidden",
  },
  vbDot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    display: "inline-block",
    marginBottom: 10,
  },
  vbName: {
    display: "block",
    fontSize: 13,
    fontWeight: 500,
    color: "#111827",
    marginBottom: 2,
  },
  vbCount: { display: "block", fontSize: 12, color: "#9ca3af" },
  vbBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: 3,
    transition: "width .3s ease",
    borderRadius: "0 2px 0 0",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "0.25rem",
  },
  lastVote: { fontSize: 11, color: "#9ca3af" },
  resetBtn: {
    fontSize: 12,
    color: "#6b7280",
    background: "none",
    border: "1px solid #e5e7eb",
    borderRadius: 6,
    padding: "6px 14px",
    cursor: "pointer",
  },
  historyWrap: { marginTop: "1rem" },
  historyTitle: {
    fontSize: 12,
    color: "#9ca3af",
    marginBottom: "0.5rem",
    fontWeight: 500,
  },
  logList: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    maxHeight: 100,
    overflowY: "auto",
  },
  logItem: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 12,
    color: "#6b7280",
  },
  logDot: { width: 6, height: 6, borderRadius: "50%", flexShrink: 0 },
  logTime: { minWidth: 60, color: "#d1d5db", fontSize: 11 },
  emptyMsg: {
    fontSize: 13,
    color: "#d1d5db",
    textAlign: "center",
    padding: "1rem 0",
  },
};
