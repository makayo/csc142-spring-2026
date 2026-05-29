# Week 08 — Window Resizer / CSS Breakpoint Explorer

A React app that listens to real browser window resize events using `useEffect`
and visualises CSS breakpoints with a live mock layout preview.

## How to run

```bash
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

## Assignment requirements met

| Requirement               | Location in code                                                  |
| ------------------------- | ----------------------------------------------------------------- |
| Real-time state tracking  | `handleResize` inside `useEffect` updates `windowSize` state      |
| `window.addEventListener` | Called inside the same effect with `"resize"` event               |
| Cleanup function          | `return () => window.removeEventListener("resize", handleResize)` |
| Dependency array comment  | Above `}, [synced]);` explaining why `[synced]` was chosen        |

## Features

- Drag the slider to simulate any width from 320 px to 1920 px
- Click a breakpoint pill (xs → 3xl) to jump directly to that viewport
- Toggle **⟳ sync window** to lock the simulator to your real browser width
- Live mock browser preview updates grid columns, sidebar, and nav per breakpoint
- Animated background colour and glow change on every breakpoint transition
- CSS media query snippet updates to match the active breakpoint

## Test cases

### Normal cases

| #   | Action                                      | Expected result                                                             |
| --- | ------------------------------------------- | --------------------------------------------------------------------------- |
| 1   | Drag slider from left to right              | Width counter increments, background colour transitions through breakpoints |
| 2   | Click the `md` pill                         | Simulated width jumps to 768 px, sidebar and top nav appear in the preview  |
| 3   | Resize the real browser window with sync on | `W` and `H` values update live to match actual window dimensions            |

### Edge cases

| #   | Action                                                        | Expected result                                                         |
| --- | ------------------------------------------------------------- | ----------------------------------------------------------------------- |
| 4   | Drag slider all the way to the left (min)                     | Width clamps at 320 px, stays on `xs` breakpoint, no negative values    |
| 5   | Drag slider all the way to the right (max)                    | Width clamps at 1920 px, `3xl` breakpoint, no overflow                  |
| 6   | Click `xs` pill then immediately drag slider                  | `synced` is set to false, manual control takes over with no flicker     |
| 7   | Rapidly resize real browser window                            | Only one event listener is active; no duplicate handlers or stale state |
| 8   | Simulate width exactly at a breakpoint boundary (e.g. 768 px) | Correct breakpoint activates at the boundary value, not one pixel off   |

## Tech stack

- React 18 + Vite
- `useEffect` for resize event listener and cleanup
- `useRef` for DOM measurements and RAF handle
- `ResizeObserver` for accurate container width measurement
