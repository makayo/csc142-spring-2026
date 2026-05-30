import "@testing-library/jest-dom";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import App from "./App";

// ── Setup ─────────────────────────────────────────────────────────────────────

beforeEach(() => {
  Object.defineProperty(window, "innerWidth", { writable: true, value: 1024 });
  Object.defineProperty(window, "innerHeight", { writable: true, value: 768 });

  global.ResizeObserver = class {
    observe() {}
    disconnect() {}
  };
});

afterEach(() => {
  vi.restoreAllMocks();
});

// ── Normal test cases ─────────────────────────────────────────────────────────

describe("Normal cases", () => {
  it("N1 — clicking a breakpoint pill updates the displayed width", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: /^lg$/i }));

    // lg breakpoint min is 1024 — width display should read 1024
    expect(screen.getAllByText("1024").length).toBeGreaterThan(0);
  });

  it("N2 — clicking the md pill activates the md breakpoint with sidebar visible", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: /^md$/i }));

    // Width should be 768
    expect(screen.getAllByText("768").length).toBeGreaterThan(0);

    // At least one callout item should say ✓ visible (sidebar + top nav both show it)
    expect(screen.getAllByText("✓ visible").length).toBeGreaterThan(0);
  });

  it("N3 — real window resize updates W and H when sync is on", () => {
    render(<App />);

    act(() => {
      window.innerWidth = 1280;
      window.innerHeight = 900;
      window.dispatchEvent(new Event("resize"));
    });

    expect(screen.getAllByText("1280").length).toBeGreaterThan(0);
    expect(screen.getAllByText("900").length).toBeGreaterThan(0);
  });
});

// ── Edge test cases ───────────────────────────────────────────────────────────

describe("Edge cases", () => {
  it("E1 — clicking xs pill clamps width to 320 px and shows xs breakpoint", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: /^xs$/i }));

    expect(screen.getAllByText("320").length).toBeGreaterThan(0);
    expect(screen.getByText(/Extra Small/i)).toBeTruthy();
  });

  it("E2 — clicking 3xl pill shows 1920 px and activates 3xl breakpoint", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: /^3xl$/i }));

    expect(screen.getAllByText("1920").length).toBeGreaterThan(0);
    expect(screen.getByText(/3X Large/i)).toBeTruthy();
  });

  it("E3 — clicking a pill disables sync so real window resize no longer updates width", () => {
    render(<App />);

    // Click xs — this sets synced = false
    fireEvent.click(screen.getByRole("button", { name: /^xs$/i }));

    // Fire a real resize — should NOT update the displayed width
    act(() => {
      window.innerWidth = 1440;
      window.dispatchEvent(new Event("resize"));
    });

    // 1440 should not appear because sync is off
    expect(screen.queryByText("1440")).toBeNull();
  });
});
