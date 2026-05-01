import { useState } from "react";
import { useCreatePost } from "../hooks/usePosts";

export default function CreatePostModal({ onClose }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState("1");
  const mut = useCreatePost();

  const submit = () => {
    if (!title.trim() || !body.trim()) return;
    mut.mutate(
      { title: title.trim(), body: body.trim(), userId: Number(userId) || 1 },
      { onSuccess: onClose },
    );
  };

  return (
    <div
      style={s.overlay}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div style={s.modal}>
        <div style={s.header}>
          <h2 style={s.heading}>New Post</h2>
          <button style={s.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>

        <label style={s.label}>Title</label>
        <input
          style={s.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a title..."
          maxLength={120}
        />

        <label style={s.label}>Body</label>
        <textarea
          style={s.textarea}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your content..."
          rows={5}
        />

        <label style={s.label}>User ID</label>
        <input
          style={s.input}
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          type="number"
          min="1"
          max="10"
        />

        {mut.isError && <p style={s.error}>Failed to create. Try again.</p>}

        <div style={s.btnRow}>
          <button style={s.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button
            style={{
              ...s.submitBtn,
              background: "#f5a623",
              color: "#0d111c",
              opacity: !title.trim() || !body.trim() ? 0.4 : 1,
            }}
            onClick={submit}
            disabled={mut.isPending || !title.trim() || !body.trim()}
          >
            {mut.isPending ? "Publishing..." : "Publish"}
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
    maxWidth: 500,
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  heading: { color: "#e8ecf4", fontSize: 22, fontWeight: 800 },
  closeBtn: {
    background: "#2a3045",
    border: "none",
    color: "#e8ecf4",
    width: 32,
    height: 32,
    borderRadius: 8,
    cursor: "pointer",
  },
  label: {
    color: "#6b7a99",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginTop: 10,
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
  },
  textarea: {
    background: "#111520",
    border: "1px solid #2a3045",
    borderRadius: 10,
    padding: "11px 14px",
    color: "#e8ecf4",
    fontSize: 14,
    outline: "none",
    width: "100%",
    resize: "vertical",
    fontFamily: "inherit",
  },
  error: { color: "#e03e3e", fontSize: 13 },
  btnRow: { display: "flex", gap: 10, marginTop: 18 },
  cancelBtn: {
    flex: 1,
    padding: "13px 0",
    borderRadius: 12,
    border: "1px solid #2a3045",
    background: "transparent",
    color: "#6b7a99",
    fontWeight: 600,
    fontSize: 15,
    cursor: "pointer",
  },
  submitBtn: {
    flex: 2,
    padding: "13px 0",
    borderRadius: 12,
    border: "none",
    fontWeight: 800,
    fontSize: 15,
    cursor: "pointer",
  },
};
