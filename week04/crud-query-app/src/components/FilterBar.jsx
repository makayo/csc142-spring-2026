import { useState } from "react";

const QUICK = [null, 1, 2, 3, 4, 5];

export default function FilterBar({ activeUserId, onFilter }) {
  const [input, setInput] = useState("");

  const apply = () => {
    const n = parseInt(input, 10);
    onFilter(!input.trim() ? null : !isNaN(n) && n > 0 ? n : activeUserId);
    setInput("");
  };

  return (
    <div
      style={{
        marginBottom: 16,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div style={{ display: "flex", gap: 8 }}>
        <input
          style={s.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && apply()}
          placeholder="Filter by User ID..."
          type="number"
          min="1"
        />
        <button style={s.goBtn} onClick={apply}>
          Go
        </button>
        {activeUserId !== null && (
          <button
            style={s.clearBtn}
            onClick={() => {
              onFilter(null);
              setInput("");
            }}
          >
            ✕
          </button>
        )}
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {QUICK.map((id) => (
          <button
            key={String(id)}
            style={{ ...s.pill, ...(activeUserId === id ? s.pillActive : {}) }}
            onClick={() => onFilter(id)}
          >
            {id === null ? "All" : `User ${id}`}
          </button>
        ))}
      </div>
    </div>
  );
}

const s = {
  input: {
    flex: 1,
    background: "#1a1f2e",
    border: "1px solid #2a3045",
    borderRadius: 10,
    padding: "10px 14px",
    color: "#e8ecf4",
    fontSize: 14,
    outline: "none",
  },
  goBtn: {
    background: "#f5a623",
    color: "#0d111c",
    border: "none",
    borderRadius: 10,
    padding: "10px 20px",
    fontWeight: 800,
    fontSize: 14,
    cursor: "pointer",
  },
  clearBtn: {
    background: "#2a3045",
    color: "#e8ecf4",
    border: "none",
    borderRadius: 10,
    width: 40,
    fontSize: 14,
    cursor: "pointer",
  },
  pill: {
    padding: "6px 14px",
    borderRadius: 20,
    background: "#1a1f2e",
    border: "1px solid #2a3045",
    color: "#8892aa",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
  },
  pillActive: {
    background: "#f5a623",
    border: "1px solid #f5a623",
    color: "#0d111c",
  },
};
