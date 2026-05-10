import { Link } from "react-router";

export default function About() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px" }}>
      <Link to="/" style={{ color: "#3b82f6", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>
        ← Back to Feed
      </Link>

      <h1 style={{ fontSize: 32, fontWeight: 800, color: "#0f172a", margin: "24px 0 8px", letterSpacing: "-0.5px" }}>
        About
      </h1>

      <div style={{ width: 48, height: 4, background: "#3b82f6", borderRadius: 2, marginBottom: 32 }} />

      <p style={{ fontSize: 16, color: "#475569", lineHeight: 1.8, marginBottom: 20 }}>
        This blog is a space for honest writing about frontend development, software architecture, and the craft of building things for the web.
      </p>
      <p style={{ fontSize: 16, color: "#475569", lineHeight: 1.8, marginBottom: 20 }}>
        Posts are written from real experience — projects built, bugs fixed, decisions made and sometimes regretted. No fluff, no filler.
      </p>
      <p style={{ fontSize: 16, color: "#475569", lineHeight: 1.8, marginBottom: 40 }}>
        Written by <strong style={{ color: "#0f172a" }}>Mark Yosinao</strong> — frontend developer focused on React, TypeScript, and clean UI.
      </p>

      <div style={{
        background: "#f8fafc",
        border: "1px solid #e2e8f0",
        borderRadius: 12,
        padding: "24px 28px",
      }}>
        <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700, color: "#0f172a" }}>
          Built With
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {["React 18", "React Router v7", "TypeScript", "Vite", "Inline CSS"].map(tech => (
            <span key={tech} style={{
              background: "#fff",
              border: "1px solid #e2e8f0",
              color: "#475569",
              fontSize: 13,
              fontWeight: 500,
              padding: "4px 12px",
              borderRadius: 20,
            }}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
