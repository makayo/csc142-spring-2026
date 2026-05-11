import { Links, Meta, Outlet, Scripts, ScrollRestoration, Link, NavLink } from "react-router";
import "./app.css";

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, fontFamily: "'Inter', system-ui, sans-serif", background: "#fff", color: "#0f172a" }}>

        <nav style={{
          borderBottom: "1px solid #f1f5f9",
          position: "sticky",
          top: 0,
          background: "#fff",
          zIndex: 100,
        }}>
          <div style={{
            maxWidth: 720,
            margin: "0 auto",
            padding: "0 24px",
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <span style={{ fontWeight: 800, fontSize: 18, color: "#0f172a", letterSpacing: "-0.5px" }}>
                The<span style={{ color: "#3b82f6" }}>Feed</span>
              </span>
            </Link>

            <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
              <NavLink to="/" end style={({ isActive }) => ({
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 500,
                color: isActive ? "#3b82f6" : "#64748b",
              })}>
                Home
              </NavLink>
              <NavLink to="/about" style={({ isActive }) => ({
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 500,
                color: isActive ? "#3b82f6" : "#64748b",
              })}>
                About
              </NavLink>
            </div>
          </div>
        </nav>

        <Outlet />

        <footer style={{
          borderTop: "1px solid #f1f5f9",
          marginTop: 80,
          padding: "32px 24px",
          textAlign: "center",
          color: "#94a3b8",
          fontSize: 13,
        }}>
          TheFeed — Mark Yosinao
        </footer>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
