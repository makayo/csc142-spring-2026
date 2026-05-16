import { useContext } from "react";
import { UserContext } from "../UserContext";

function Navbar() {
  const { user, toggleTheme } = useContext(UserContext);

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 24px",
        borderBottom: "1px solid #e5e7eb",
        background: user.themePreference === "dark" ? "#1f2937" : "#ffffff",
        color: user.themePreference === "dark" ? "#f9fafb" : "#111827",
      }}
    >
      <span style={{ fontWeight: 600, fontSize: "16px" }}>
        Context Refactor App
      </span>
      <button
        onClick={toggleTheme}
        style={{
          padding: "6px 14px",
          borderRadius: "8px",
          border: "1px solid #d1d5db",
          cursor: "pointer",
          background: user.themePreference === "dark" ? "#374151" : "#f3f4f6",
          color: user.themePreference === "dark" ? "#f9fafb" : "#111827",
          fontSize: "13px",
        }}
      >
        {user.themePreference === "dark" ? "☀️ Light" : "🌙 Dark"}
      </button>
    </nav>
  );
}

export default Navbar;
