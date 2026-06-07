import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { useLocalStorage } from "./useLocalStorage";

beforeEach(() => localStorage.clear());

// Normal cases
describe("Normal cases", () => {
  it("1. returns initialValue when nothing is stored", () => {
    const { result } = renderHook(() => useLocalStorage("theme", "light"));
    expect(result.current[0]).toBe("light");
  });

  it("2. saves value to localStorage when updated", () => {
    const { result } = renderHook(() => useLocalStorage("theme", "light"));
    act(() => result.current[1]("dark"));
    expect(localStorage.getItem("theme")).toBe('"dark"');
  });

  it("3. loads existing value from localStorage on mount", () => {
    localStorage.setItem("theme", JSON.stringify("dark"));
    const { result } = renderHook(() => useLocalStorage("theme", "light"));
    expect(result.current[0]).toBe("dark");
  });
});

// Edge cases
describe("Edge cases", () => {
  it("4. handles storing objects not just strings", () => {
    const { result } = renderHook(() => useLocalStorage("prefs", { size: 14 }));
    act(() => result.current[1]({ size: 18 }));
    expect(JSON.parse(localStorage.getItem("prefs"))).toEqual({ size: 18 });
  });

  it("5. falls back to initialValue when localStorage has corrupt JSON", () => {
    localStorage.setItem("theme", "%%%broken%%%");
    const { result } = renderHook(() => useLocalStorage("theme", "light"));
    expect(result.current[0]).toBe("light");
  });

  it("6. two different keys dont overwrite each other", () => {
    const { result: r1 } = renderHook(() => useLocalStorage("theme", "light"));
    const { result: r2 } = renderHook(() => useLocalStorage("lang", "en"));
    act(() => r1.current[1]("dark"));
    act(() => r2.current[1]("es"));
    expect(JSON.parse(localStorage.getItem("theme"))).toBe("dark");
    expect(JSON.parse(localStorage.getItem("lang"))).toBe("es");
  });
});
