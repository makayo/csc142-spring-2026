import { useState, useEffect } from "react";
import { usePatchPost } from "../hooks/usePosts";

export default function PatchModal({ post, onClose }) {
  const [title, setTitle] = useState("");
  const mut = usePatchPost();

  useEffect(() => {
    if (post) setTitle(post.title);
  }, [post]);

  const submit = () => {
    if (!title.trim()) return;
    mut.mutate({ id: post.id, title: title.trim() }, { onSuccess: onClose });
  };

  return (
    <div
      style={s.overlay}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div style={s.modal}>
        <div style={s.header}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <h2 style={s.heading}>Rename Post</h2>
            <span style={s.badge}>PATCH</span>
          </div>
          <button style={s.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>

        <p style={s.subtitle}>
          Only the title will be updated — body stays the same.
        </p>

        <label style={s.label}>New Title</label>
        <input
          style={s.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter new title..."
          maxLength={120}
          autoFocus
          onKeyDown={(e) => e.key === "Enter" && submit()}
        />

        {mut.isError && <p style={s.error}>Rename failed. Try again.</p>}

        <div style={s.btnRow}>
          <button style={s.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button
            style={{ ...s.submitBtn, opacity: !title.trim() ? 0.4 : 1 }}
            onClick={submit}
            disabled={mut.isPending || !title.trim()}
          >
            {mut.isPending ? "Renaming..." : "Rename"}
          </button>
        </div>
      </div>
    </div>
  );
}

const s = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.65)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
    padding: 16,
  },
  modal: {
    background: "#1a1f2e",
    border: "1px solid #2a3045",
    borderRadius: 20,
    padding: 28,
    width: "100%",
    maxWidth: 440,
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  heading: { color: "#e8ecf4", fontSize: 20, fontWeight: 800 },
  badge: {
    background: "#8b5cf6",
    color: "#fff",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 0.5,
    padding: "3px 8px",
    borderRadius: 6,
  },
  closeBtn: {
    background: "#2a3045",
    border: "none",
    color: "#e8ecf4",
    width: 32,
    height: 32,
    borderRadius: 8,
    cursor: "pointer",
  },
  subtitle: {
    color: "#6b7a99",
    fontSize: 13,
    lineHeight: 1.5,
    marginBottom: 8,
  },
  label: {
    color: "#6b7a99",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginTop: 6,
  },
  input: {
    background: "#111520",
    border: "1px solid #2a3045",
    borderRadius: 10,
    padding: "11px 14px",
    color: "#e8ecf4",
    fontSize: 14,
    outline: "none",
    width: "100%",
    marginBottom: 4,
  },
  error: { color: "#e03e3e", fontSize: 13 },
  btnRow: { display: "flex", gap: 10, marginTop: 16 },
  cancelBtn: {
    flex: 1,
    padding: "12px 0",
    borderRadius: 12,
    border: "1px solid #2a3045",
    background: "transparent",
    color: "#6b7a99",
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
  },
  submitBtn: {
    flex: 2,
    padding: "12px 0",
    borderRadius: 12,
    border: "none",
    background: "#8b5cf6",
    color: "#fff",
    fontWeight: 800,
    fontSize: 14,
    cursor: "pointer",
  },
};
