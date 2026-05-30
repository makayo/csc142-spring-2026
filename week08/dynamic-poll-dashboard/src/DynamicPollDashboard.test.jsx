import "@testing-library/jest-dom";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import DynamicPollDashboard from "./DynamicPollDashboard";

// ── Mock Chart.js — jsdom has no canvas API ───────────────────────────────────
vi.mock("chart.js/auto", () => {
  class Chart {
    constructor() {
      this.data = { datasets: [{ data: [] }] };
      this.update = vi.fn();
      this.destroy = vi.fn();
    }
  }
  return { default: Chart };
});

// ── Setup ─────────────────────────────────────────────────────────────────────
beforeEach(() => {
  // Provide a minimal canvas stub so Chart.js mock doesn't throw
  HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
    clearRect: vi.fn(),
    fillRect: vi.fn(),
  }));
});

afterEach(() => {
  vi.clearAllMocks();
});

// ── Normal test cases ─────────────────────────────────────────────────────────

describe("Normal cases", () => {
  it("N1 — voting for React increments its count and updates total votes", () => {
    render(<DynamicPollDashboard />);

    fireEvent.click(screen.getByRole("button", { name: /vote for react/i }));
    fireEvent.click(screen.getByRole("button", { name: /vote for react/i }));
    fireEvent.click(screen.getByRole("button", { name: /vote for react/i }));

    // Total votes metric should show 3
    expect(screen.getAllByText("3").length).toBeGreaterThan(0);

    // React vote button should show 3 votes
    expect(screen.getByText(/3 votes/i)).toBeTruthy();
  });

  it("N2 — voting for multiple frameworks updates all counts correctly", () => {
    render(<DynamicPollDashboard />);

    fireEvent.click(screen.getByRole("button", { name: /vote for react/i }));
    fireEvent.click(screen.getByRole("button", { name: /vote for vue/i }));
    fireEvent.click(screen.getByRole("button", { name: /vote for angular/i }));

    // Total should be 3
    expect(screen.getAllByText("3").length).toBeGreaterThan(0);

    // Each framework shows 1 vote
    expect(screen.getAllByText(/1 vote ·/).length).toBe(3);
  });

  it("N3 — each vote appears in the recent activity log", () => {
    render(<DynamicPollDashboard />);

    fireEvent.click(screen.getByRole("button", { name: /vote for vue/i }));
    fireEvent.click(screen.getByRole("button", { name: /vote for angular/i }));

    expect(screen.getByText(/Vue received a vote/i)).toBeTruthy();
    expect(screen.getByText(/Angular received a vote/i)).toBeTruthy();
  });
});

// ── Edge test cases ───────────────────────────────────────────────────────────

describe("Edge cases", () => {
  it("E1 — voting only for one framework makes it the leader with full margin", () => {
    render(<DynamicPollDashboard />);

    fireEvent.click(screen.getByRole("button", { name: /vote for react/i }));
    fireEvent.click(screen.getByRole("button", { name: /vote for react/i }));
    fireEvent.click(screen.getByRole("button", { name: /vote for react/i }));

    // Leading framework card should show React (appears in metric + vote button)
    expect(screen.getAllByText("React").length).toBeGreaterThan(0);

    // Lead margin should be +3 (React 3, others 0)
    expect(screen.getByText("+3")).toBeTruthy();
  });

  it("E2 — reset clears all votes, log, and resets metrics to zero", () => {
    render(<DynamicPollDashboard />);

    fireEvent.click(screen.getByRole("button", { name: /vote for react/i }));
    fireEvent.click(screen.getByRole("button", { name: /vote for vue/i }));

    // Confirm votes registered
    expect(screen.getAllByText("2").length).toBeGreaterThan(0);

    // Reset
    fireEvent.click(screen.getByRole("button", { name: /reset all votes/i }));

    // Total votes back to 0
    expect(screen.getAllByText("0").length).toBeGreaterThan(0);

    // Log cleared
    expect(screen.getByText(/votes will appear here/i)).toBeTruthy();

    // Last vote text cleared
    expect(screen.getByText(/no votes yet/i)).toBeTruthy();
  });

  it("E3 — equal votes for all frameworks shows Tied for leader and margin", () => {
    render(<DynamicPollDashboard />);

    fireEvent.click(screen.getByRole("button", { name: /vote for react/i }));
    fireEvent.click(screen.getByRole("button", { name: /vote for vue/i }));
    fireEvent.click(screen.getByRole("button", { name: /vote for angular/i }));

    // Both leader and margin should show Tied
    expect(screen.getAllByText("Tied").length).toBe(2);
  });
});
