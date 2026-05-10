import { Link } from "react-router";
import { posts } from "../data/posts.js";

export default function Home() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px" }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, color: "#0f172a", marginBottom: 8, letterSpacing: "-0.5px" }}>
        The Feed
      </h1>
      <p style={{ color: "#64748b", fontSize: 16, marginBottom: 48 }}>
        Thoughts on engineering, design, and building things that matter.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        {posts.map((post) => (
          <Link
            key={post.id}
            to={`/post/${post.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              style={{
                borderBottom: "1px solid #f1f5f9",
                paddingBottom: 32,
                transition: "opacity 0.15s",
                cursor: "pointer",
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.7"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
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
              <h2 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 700, color: "#0f172a", letterSpacing: "-0.3px" }}>
                {post.title}
              </h2>
              <p style={{ margin: "0 0 12px", color: "#64748b", fontSize: 15, lineHeight: 1.7 }}>
                {post.summary}
              </p>
              <span style={{ color: "#3b82f6", fontSize: 14, fontWeight: 600 }}>
                Read more →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
