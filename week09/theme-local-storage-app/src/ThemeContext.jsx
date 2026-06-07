import { createContext, useContext } from "react";
import { useLocalStorage } from "./useLocalStorage";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
