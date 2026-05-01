import { useState } from "react";
import { usePosts } from "./hooks/usePosts";
import PostCard from "./components/PostCard";
import FilterBar from "./components/FilterBar";
import CreatePostModal from "./components/CreatePostModal";

export default function App() {
  const [activeUserId, setActiveUserId] = useState(null);
  const [createOpen, setCreateOpen] = useState(false);
  const { data, isLoading, isError, refetch, isFetching } =
    usePosts(activeUserId);

  return (
    <div style={{ paddingTop: 32 }}>
      {/* Header */}
      <div style={s.header}>
        <div>
          <p style={s.eyebrow}>JSONPlaceholder</p>
          <h1 style={s.heading}>Posts</h1>
        </div>
        <button style={s.newBtn} onClick={() => setCreateOpen(true)}>
          + New Post
        </button>
      </div>

      {/* Filter */}
      <FilterBar activeUserId={activeUserId} onFilter={setActiveUserId} />

      {/* Status */}
      {!isLoading && data && (
        <p style={s.status}>
          {data.length} post{data.length !== 1 ? "s" : ""}
          {activeUserId ? ` · User ${activeUserId}` : ""}
          {isFetching && " · refreshing..."}
        </p>
      )}

      {/* States */}
      {isLoading && (
        <div style={s.center}>
          <p style={s.muted}>Loading posts...</p>
        </div>
      )}

      {isError && (
        <div style={s.center}>
          <p style={s.muted}>Something went wrong.</p>
          <button style={s.retryBtn} onClick={() => refetch()}>
            Retry
          </button>
        </div>
      )}

      {!isLoading && !isError && data?.length === 0 && (
        <div style={s.center}>
          <p style={{ fontSize: 40, marginBottom: 8 }}>📭</p>
          <p style={s.muted}>
            No posts found{activeUserId ? ` for User ${activeUserId}` : ""}.
          </p>
        </div>
      )}

      {/* List */}
      {data?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {createOpen && <CreatePostModal onClose={() => setCreateOpen(false)} />}
    </div>
  );
}

const s = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  eyebrow: {
    color: "#f5a623",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  heading: {
    color: "#e8ecf4",
    fontSize: 36,
    fontWeight: 900,
    letterSpacing: -1,
  },
  newBtn: {
    background: "#f5a623",
    color: "#0d111c",
    border: "none",
    borderRadius: 20,
    padding: "10px 20px",
    fontWeight: 800,
    fontSize: 14,
    cursor: "pointer",
  },
  status: { color: "#4a5568", fontSize: 12, fontWeight: 600, marginBottom: 16 },
  center: { textAlign: "center", paddingTop: 80 },
  muted: { color: "#6b7a99", fontSize: 15, marginBottom: 16 },
  retryBtn: {
    background: "#f5a623",
    color: "#0d111c",
    border: "none",
    borderRadius: 10,
    padding: "10px 24px",
    fontWeight: 700,
    cursor: "pointer",
  },
};
