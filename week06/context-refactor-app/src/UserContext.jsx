import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    name: "Mark Ayala",
    email: "mark@example.com",
    themePreference: "dark",
  });

  function toggleTheme() {
    setUser((prev) => ({
      ...prev,
      themePreference: prev.themePreference === "dark" ? "light" : "dark",
    }));
  }

  function updateUser(field, value) {
    setUser((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <UserContext.Provider value={{ user, setUser, toggleTheme, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}
