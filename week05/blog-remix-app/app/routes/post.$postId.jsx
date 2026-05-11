import { useParams, useNavigate, Link } from "react-router";
import { posts } from "../data/posts.js";

export default function PostView() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const post = posts.find((p) => String(p.id) === postId);

  if (!post) {
    return (
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px", textAlign: "center" }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>
          Post not found
        </h1>
        <p style={{ color: "#64748b", marginBottom: 24 }}>
          The post you are looking for does not exist.
        </p>
        <Link to="/" style={{ color: "#3b82f6", fontWeight: 600, textDecoration: "none" }}>
          Back to Feed
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px" }}>
      <button
        onClick={() => navigate("/")}
        style={{
          background: "none",
          border: "none",
          color: "#3b82f6",
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
          padding: 0,
          marginBottom: 32,
        }}
      >
        ← Return to Feed
      </button>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <span style={{
          background: "#f1f5f9",
          color: "#475569",
          fontSize: 11,
          fontWeight: 700,
          padding: "3px 10px",
          borderRadius: 20,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}>
          {post.category}
        </span>
        <span style={{ color: "#94a3b8", fontSize: 13 }}>{post.date}</span>
      </div>

      <h1 style={{
        fontSize: 36,
        fontWeight: 800,
        color: "#0f172a",
        margin: "0 0 16px",
        lineHeight: 1.2,
        letterSpacing: "-0.5px",
      }}>
        {post.title}
      </h1>

      <p style={{
        fontSize: 18,
        color: "#64748b",
        lineHeight: 1.7,
        marginBottom: 8,
        fontStyle: "italic",
      }}>
        {post.summary}
      </p>

      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        margin: "24px 0 40px",
        paddingBottom: 32,
        borderBottom: "1px solid #f1f5f9",
      }}>
        <div style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "#3b82f6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontWeight: 700,
          fontSize: 14,
        }}>
          M
        </div>
        <span style={{ color: "#475569", fontSize: 14, fontWeight: 500 }}>
          {post.author}
        </span>
      </div>

      <p style={{
        fontSize: 17,
        color: "#334155",
        lineHeight: 1.9,
      }}>
        {post.content}
      </p>
    </div>
  );
}
