# Window Size Tracker — useWindowSize Custom Hook

A React + Vite application demonstrating a reusable custom hook that tracks browser window dimensions and switches layouts based on screen width, simulating a streaming platform's responsive behavior.

## Features

- **Custom hook** (`useWindowSize`) encapsulates all resize-tracking logic
- Live width and height readout that updates on every resize event
- Three distinct layouts: Mobile (≤767px), Tablet (768–1023px), Desktop (≥1024px)
- Proper `useEffect` cleanup removes the event listener on unmount

## Project Structure

```
src/
├── hooks/
│   └── useWindowSize.jsx   ← custom hook
├── App.jsx                 ← main component
├── App.css                 ← styles
└── main.jsx                ← entry point
```

## How to Run

```bash
# 1. Clone the repo
git clone <repository-url>
cd window-resizer

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
# → http://localhost:5173/
```

## Test Cases

### Normal Cases

| #   | Scenario                           | Expected                                             | Result    |
| --- | ---------------------------------- | ---------------------------------------------------- | --------- |
| 1   | Initial desktop load (≥1024px)     | Width/height display correctly; Desktop Layout shown | ✅ Passed |
| 2   | Resize browser window on desktop   | Width and height update in real time                 | ✅ Passed |
| 3   | Resize from desktop to below 768px | Layout switches to Mobile                            | ✅ Passed |

### Edge Cases

| #   | Scenario                        | Expected                                        | Result    |
| --- | ------------------------------- | ----------------------------------------------- | --------- |
| 4   | Extremely narrow width (~300px) | App remains functional; Mobile Layout shown     | ✅ Passed |
| 5   | Very wide monitor (1920px+)     | Width updates correctly; Desktop Layout remains | ✅ Passed |
| 6   | Rapid continuous resizing       | Dimensions update without crashes or errors     | ✅ Passed |

## Learning Outcomes

- Custom hooks allow logic (here: window tracking) to be reused across any component.
- `useEffect` with an empty dependency array runs once on mount, attaching the event listener.
- The cleanup function (`return () => removeEventListener(...)`) prevents memory leaks.
- `useState` triggers re-renders so the UI always reflects the latest dimensions.

## Author

Mark Yosinao
