import { useTheme } from "./ThemeContext";

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: "8px 20px",
        borderRadius: "20px",
        border: "none",
        cursor: "pointer",
        fontSize: "20px",
        background: theme === "dark" ? "#374151" : "#fde68a",
        transition: "all 0.3s ease",
      }}
    >
      {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
