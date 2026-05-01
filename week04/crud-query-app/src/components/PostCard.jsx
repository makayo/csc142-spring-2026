import { useState } from "react";
import { useDeletePost } from "../hooks/usePosts";
import EditPostModal from "./EditPostModal";
import PatchModal from "./PatchModal";

export default function PostCard({ post }) {
  const [editOpen, setEditOpen] = useState(false);
  const [patchOpen, setPatchOpen] = useState(false);
  const deleteMut = useDeletePost();

  const handleDelete = () => {
    if (window.confirm(`Delete post #${post.id}?`)) deleteMut.mutate(post.id);
  };

  return (
    <>
      <div style={s.card}>
        <div style={s.meta}>
          <span style={s.idBadge}>#{post.id}</span>
          <span style={s.userId}>User {post.userId}</span>
        </div>
        <h3 style={s.title}>{post.title}</h3>
        <p style={s.body}>{post.body}</p>
        <div style={s.actions}>
          <button
            style={{ ...s.btn, background: "#2d6af5" }}
            onClick={() => setEditOpen(true)}
          >
            Edit
          </button>
          <button
            style={{ ...s.btn, background: "#8b5cf6" }}
            onClick={() => setPatchOpen(true)}
          >
            Rename
          </button>
          <button
            style={{
              ...s.btn,
              background: "#e03e3e",
              opacity: deleteMut.isPending ? 0.6 : 1,
            }}
            onClick={handleDelete}
            disabled={deleteMut.isPending}
          >
            {deleteMut.isPending ? "..." : "Delete"}
          </button>
        </div>
      </div>
      {editOpen && (
        <EditPostModal post={post} onClose={() => setEditOpen(false)} />
      )}
      {patchOpen && (
        <PatchModal post={post} onClose={() => setPatchOpen(false)} />
      )}
    </>
  );
}

const s = {
  card: {
    background: "#1a1f2e",
    border: "1px solid #2a3045",
    borderRadius: 14,
    padding: 20,
    marginBottom: 12,
  },
  meta: { display: "flex", alignItems: "center", gap: 8, marginBottom: 10 },
  idBadge: {
    background: "#f5a623",
    color: "#0d111c",
    fontSize: 11,
    fontWeight: 700,
    padding: "2px 7px",
    borderRadius: 6,
  },
  userId: { color: "#6b7a99", fontSize: 12 },
  title: {
    color: "#e8ecf4",
    fontSize: 15,
    fontWeight: 700,
    lineHeight: 1.4,
    marginBottom: 6,
    textTransform: "capitalize",
  },
  body: { color: "#8892aa", fontSize: 13, lineHeight: 1.6, marginBottom: 14 },
  actions: { display: "flex", gap: 8 },
  btn: {
    flex: 1,
    padding: "8px 0",
    borderRadius: 8,
    border: "none",
    color: "#fff",
    fontWeight: 600,
    fontSize: 12,
    cursor: "pointer",
  },
};
