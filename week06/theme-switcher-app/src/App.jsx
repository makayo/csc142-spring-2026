import { ThemeProvider, useTheme } from "./ThemeContext";
import ThemeSwitcher from "./ThemeSwitcher";
import SunScene from "./components/SunScene";
import EyesScene from "./components/EyesScene";
import "./App.css";

function AppContent() {
  const { theme } = useTheme();

  return (
    <div className={theme === "dark" ? "dark-mode" : "light-mode"}>
      <nav className="navbar">
        <span className="navbar-title">
          {theme === "dark" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </span>
        <ThemeSwitcher />
      </nav>
      <div className="main-content">
        <div className="scene-wrapper">
          {theme === "dark" ? <EyesScene /> : <SunScene />}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
