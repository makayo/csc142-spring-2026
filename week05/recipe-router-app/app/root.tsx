import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link,
} from "react-router";
import "./app.css";

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body
        style={{
          margin: 0,
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          background: "#fafaf9",
        }}
      >
        <nav
          style={{
            background: "#fff",
            borderBottom: "1px solid #f0ede8",
            position: "sticky",
            top: 0,
            zIndex: 100,
            boxShadow: "0 1px 12px rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              padding: "0 24px",
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Link
              to="/"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span
                style={{
                  fontWeight: 800,
                  fontSize: 20,
                  color: "#1a1a1a",
                  letterSpacing: "-0.5px",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Flavor<span style={{ color: "#f97316" }}>Hub</span>
              </span>
            </Link>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "#555",
                  fontWeight: 500,
                  fontSize: 15,
                  padding: "8px 16px",
                  borderRadius: 8,
                  fontFamily: "'Inter', sans-serif",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#fef3ec";
                  e.currentTarget.style.color = "#f97316";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#555";
                }}
              >
                Home
              </Link>
              <Link
                to="/gallery"
                style={{
                  textDecoration: "none",
                  background: "#f97316",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: 15,
                  padding: "8px 20px",
                  borderRadius: 8,
                  fontFamily: "'Inter', sans-serif",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#ea6c0a";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#f97316";
                }}
              >
                Browse Recipes
              </Link>
            </div>
          </div>
        </nav>

        <Outlet />

        <footer
          style={{
            marginTop: 80,
            borderTop: "1px solid #f0ede8",
            padding: "32px 24px",
            textAlign: "center",
            color: "#999",
            fontSize: 14,
            background: "#fff",
          }}
        >
          <p style={{ margin: 0 }}>
            FlavorHub — Discover recipes from around the world
          </p>
        </footer>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
