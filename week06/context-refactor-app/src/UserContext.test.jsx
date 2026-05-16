import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { UserContext, UserProvider } from "./UserContext";
import { useContext } from "react";

// Simulates UserProfile — deepest component, no props passed
function DeepComponent() {
  const { user, toggleTheme, updateUser } = useContext(UserContext);
  return (
    <div>
      <p data-testid="name">{user.name}</p>
      <p data-testid="email">{user.email}</p>
      <p data-testid="theme">{user.themePreference}</p>
      <button onClick={toggleTheme}>toggle</button>
      <button onClick={() => updateUser("name", "Jane")}>rename</button>
      <button onClick={() => updateUser("email", "jane@example.com")}>update-email</button>
    </div>
  );
}

// Simulates Dashboard and Sidebar — middle components that pass NO props
function Sidebar() { return <DeepComponent />; }
function Dashboard() { return <Sidebar />; }

function setup() {
  return render(<UserProvider><Dashboard /></UserProvider>);
}

// NORMAL CASES
describe("Normal cases — context replaces prop drilling", () => {
  it("1. UserProfile reads user data from context without any props", () => {
    setup();
    expect(screen.getByTestId("name")).toHaveTextContent("Mark Ayala");
    expect(screen.getByTestId("email")).toHaveTextContent("mark@example.com");
  });

  it("2. toggleTheme updates themePreference across the tree", () => {
    setup();
    expect(screen.getByTestId("theme")).toHaveTextContent("dark");
    fireEvent.click(screen.getByText("toggle"));
    expect(screen.getByTestId("theme")).toHaveTextContent("light");
  });

  it("3. updateUser updates name from deep component without props", () => {
    setup();
    fireEvent.click(screen.getByText("rename"));
    expect(screen.getByTestId("name")).toHaveTextContent("Jane");
  });
});

// EDGE CASES
describe("Edge cases", () => {
  it("4. toggleTheme twice returns to original theme — no state leak", () => {
    setup();
    fireEvent.click(screen.getByText("toggle"));
    fireEvent.click(screen.getByText("toggle"));
    expect(screen.getByTestId("theme")).toHaveTextContent("dark");
  });

  it("5. updateUser only changes the target field — other fields unchanged", () => {
    setup();
    fireEvent.click(screen.getByText("rename"));
    expect(screen.getByTestId("email")).toHaveTextContent("mark@example.com");
    expect(screen.getByTestId("theme")).toHaveTextContent("dark");
  });

  it("6. updating email does not affect name or theme", () => {
    setup();
    fireEvent.click(screen.getByText("update-email"));
    expect(screen.getByTestId("name")).toHaveTextContent("Mark Ayala");
    expect(screen.getByTestId("theme")).toHaveTextContent("dark");
  });
});
