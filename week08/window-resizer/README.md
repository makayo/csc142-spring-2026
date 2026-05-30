# Week 08 — Window Resizer / CSS Breakpoint Explorer

A React app that listens to real browser window resize events using `useEffect`
and visualises CSS breakpoints with a live mock layout preview.

## How to run

```bash
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

## How to run tests

```bash
npm run test
```

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

| #   | Action                                      | Expected result                                              |
| --- | ------------------------------------------- | ------------------------------------------------------------ |
| N1  | Drag slider to the midpoint                 | Width counter updates to a value between 320–1920 px         |
| N2  | Click the `md` pill                         | Simulated width jumps to 768 px and sidebar shows as visible |
| N3  | Resize the real browser window with sync on | W and H values update live to match actual window dimensions |

### Edge cases

| #   | Action                                   | Expected result                                                          |
| --- | ---------------------------------------- | ------------------------------------------------------------------------ |
| E1  | Drag slider past the left edge (min)     | Width clamps at 320 px, xs breakpoint active, no negative values         |
| E2  | Drag slider past the right edge (max)    | Width clamps at 1920 px, 3xl breakpoint activates                        |
| E3  | Click a pill then resize the real window | Sync disables — real window resize no longer updates the simulated width |

## Tech stack

- React 19 + Vite
- Vitest + React Testing Library for unit tests
- `useEffect` for resize event listener and cleanup
- `useRef` for DOM measurements and RAF handle
- `ResizeObserver` for accurate container width measurement

## Author

Mark Yosinao
