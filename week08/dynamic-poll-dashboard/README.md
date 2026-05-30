# Week 08 — Dynamic Poll Dashboard

A React app that integrates the vanilla Chart.js library into a React lifecycle
using `useEffect` as an escape hatch to imperatively control a bar chart.

## How to run

```bash
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

## Assignment requirements met

| Requirement              | Location in code                                                                 |
| ------------------------ | -------------------------------------------------------------------------------- |
| Imperative Instantiation | `if (!chartInstanceRef.current)` creates Chart only when ref is empty            |
| State Synchronization    | `else` branch mutates data array and calls `.update()` without recreating chart  |
| Cleanup Execution        | `return () => chartInstanceRef.current.destroy()` inside useEffect               |
| Code Comment             | Above the cleanup return, explains why new Chart() on every render causes errors |

## Features

- Vote for React, Vue, or Angular — bar chart updates in real time
- Metric cards show total votes, leading framework, lead margin, and session time
- Tie detection — shows "Tied" when two or more frameworks share the lead
- Activity log with timestamps for every vote
- Reset button clears all votes and restarts the session timer

## Test cases

### Normal cases

| #   | Action                        | Expected result                                                     |
| --- | ----------------------------- | ------------------------------------------------------------------- |
| N1  | Click Vote React 3 times      | React bar grows, legend shows 100%, leading framework shows React   |
| N2  | Vote for all three frameworks | All bars update, percentages split correctly, lead margin shows gap |
| N3  | Vote and check activity log   | Every vote is timestamped and appears in recent activity feed       |

### Edge cases

| #   | Action                      | Expected result                                                        |
| --- | --------------------------- | ---------------------------------------------------------------------- |
| E1  | Vote only for one framework | That bar dominates, others show 0 votes · 0%, lead margin shows count  |
| E2  | Click Reset                 | All votes clear to 0, chart resets, log clears, session timer restarts |
| E3  | Vote equally for all three  | Leading framework and lead margin both show "Tied"                     |

## Tech stack

- React 19 + Vite
- Chart.js via `useEffect` as an escape hatch
- `useRef` for imperative chart instance management

## Author

Mark Yosinao
