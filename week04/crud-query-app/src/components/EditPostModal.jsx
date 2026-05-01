import { useState, useEffect } from "react";
import { useUpdatePost } from "../hooks/usePosts";

export default function EditPostModal({ post, onClose }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const mut = useUpdatePost();

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    }
  }, [post]);

  const submit = () => {
    if (!title.trim() || !body.trim()) return;
    mut.mutate(
      {
        id: post.id,
        title: title.trim(),
        body: body.trim(),
        userId: post.userId,
      },
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
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <h2 style={s.heading}>Edit Post</h2>
            <span style={{ ...s.badge, background: "#2d6af5" }}>PUT</span>
          </div>
          <button style={s.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>

        <label style={s.label}>Title</label>
        <input
          style={s.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={120}
        />

        <label style={s.label}>Body</label>
        <textarea
          style={s.textarea}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={5}
        />

        {mut.isError && <p style={s.error}>Update failed. Try again.</p>}

        <div style={s.btnRow}>
          <button style={s.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button
            style={{
              ...s.submitBtn,
              background: "#2d6af5",
              opacity: !title.trim() || !body.trim() ? 0.4 : 1,
            }}
            onClick={submit}
            disabled={mut.isPending || !title.trim() || !body.trim()}
          >
            {mut.isPending ? "Saving..." : "Save Changes"}
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
    alignItems: "flex-start",
    marginBottom: 12,
  },
  heading: { color: "#e8ecf4", fontSize: 22, fontWeight: 800 },
  badge: {
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
    color: "#fff",
    fontWeight: 800,
    fontSize: 15,
    cursor: "pointer",
  },
};
