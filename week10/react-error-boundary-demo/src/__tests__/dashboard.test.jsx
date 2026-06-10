import { render, screen, fireEvent, act } from "@testing-library/react";
import { test, expect } from "vitest";
import App from "../App";

/* =========================
   NORMAL CASE TESTS (3)
========================= */

test("normal - app renders main UI", () => {
  render(<App />);
  expect(screen.getByText("News Feed")).toBeInTheDocument();
});

test("normal - weather widget renders", () => {
  render(<App />);
  expect(screen.getByText("Seattle Weather")).toBeInTheDocument();
});

test("normal - simulate failure button exists", () => {
  render(<App />);
  expect(screen.getByText("Simulate Failure")).toBeInTheDocument();
});

/* =========================
   EDGE CASE TESTS (3)
========================= */

test("edge - crash triggers error boundary UI", () => {
  render(<App />);

  act(() => {
    screen.getByText("Simulate Failure").click();
  });

  expect(screen.getByText("Widget Offline")).toBeInTheDocument();
});

test("edge - reset button restores widget UI", () => {
  render(<App />);

  act(() => {
    screen.getByText("Simulate Failure").click();
  });

  act(() => {
    screen.getByText("Reset Widget").click();
  });

  expect(screen.getByText("Seattle Weather")).toBeInTheDocument();
});

test("edge - app continues rendering after widget crash", () => {
  render(<App />);

  act(() => {
    screen.getByText("Simulate Failure").click();
  });

  expect(screen.getByText("News Feed")).toBeInTheDocument();
});
