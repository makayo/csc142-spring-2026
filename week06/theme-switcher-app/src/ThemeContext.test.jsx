import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeContext, ThemeProvider, useTheme } from "./ThemeContext";
import { useContext } from "react";

function TestComponent() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <p data-testid="theme">{theme}</p>
      <button onClick={toggleTheme}>toggle</button>
    </div>
  );
}

function setup() {
  return render(
    <ThemeProvider>
      <TestComponent />
    </ThemeProvider>
  );
}

describe("Normal cases", () => {
  it("1. default theme is light", () => {
    setup();
    expect(screen.getByTestId("theme").textContent).toBe("light");
  });

  it("2. toggleTheme switches light to dark", () => {
    setup();
    fireEvent.click(screen.getByText("toggle"));
    expect(screen.getByTestId("theme").textContent).toBe("dark");
  });

  it("3. toggleTheme switches dark back to light", () => {
    setup();
    fireEvent.click(screen.getByText("toggle"));
    fireEvent.click(screen.getByText("toggle"));
    expect(screen.getByTestId("theme").textContent).toBe("light");
  });
});

describe("Edge cases", () => {
  it("4. toggling twice returns to original theme — no state leak", () => {
    setup();
    fireEvent.click(screen.getByText("toggle"));
    fireEvent.click(screen.getByText("toggle"));
    expect(screen.getByTestId("theme").textContent).toBe("light");
  });

  it("5. theme is accessible via useTheme from any component", () => {
    setup();
    expect(screen.getByTestId("theme")).toBeInTheDocument();
  });

  it("6. toggling 10 times lands back on light", () => {
    setup();
    for (let i = 0; i < 10; i++) fireEvent.click(screen.getByText("toggle"));
    expect(screen.getByTestId("theme").textContent).toBe("light");
  });
});
