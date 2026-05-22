# Global Theme Switcher

A React application that implements a global Light/Dark mode switcher using the React Context API. The theme state is managed centrally and consumed by every component in the tree — no prop drilling required.

## Overview

When you toggle the theme:

- **Light mode** — a bright sunny day scene with an animated sun and floating clouds
- **Dark mode** — a pitch black scene with glowing white eyes that look left and right, blink, and after 2 seconds a creepy white grin appears

The toggle button and navbar title update instantly to reflect the current theme, powered entirely by `useContext`.

## Features

- `ThemeContext` — global theme state using `createContext` and `useState`
- `ThemeProvider` — wraps the entire app and exposes `theme` and `toggleTheme`
- `ThemeSwitcher` — button component that reads context and triggers the toggle
- Dynamic CSS classes (`.light-mode` / `.dark-mode`) applied to the root container
- Animated sun with rays and floating clouds in light mode
- Glowing blinking eyes with delayed smile reveal in dark mode

## Tech Stack

- React 19
- Vite
- React Context API (`createContext`, `useContext`)
- Vitest + React Testing Library

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Running Tests

```bash
npm test
```

6 tests covering core context behavior:

**Normal cases**

1. Default theme is light
2. `toggleTheme` switches from light to dark
3. `toggleTheme` switches back from dark to light

**Edge cases** 
4. Toggling twice returns to the original theme — no state leak 
5. Theme value is accessible from any depth via context 
6. Toggling 10 times lands back on the correct theme

## Project Structure

```
src/
├── ThemeContext.jsx          # createContext + ThemeProvider + toggleTheme
├── ThemeSwitcher.jsx         # toggle button — reads theme via useContext
├── App.jsx                   # root — wrapped in ThemeProvider, applies CSS class
├── App.css                   # .light-mode and .dark-mode class definitions
├── components/
│   ├── SunScene.jsx          # animated sunny day scene for light mode
│   └── EyesScene.jsx         # glowing eyes + smile scene for dark mode
└── ThemeContext.test.jsx     # Vitest test suite
```

## Key Concepts Demonstrated

**Context setup** — `ThemeContext` is created with `createContext()` and provided at the root level via `ThemeProvider`. Any component calls `useTheme()` to access the current theme and toggle function directly.

**Dynamic styling** — the root `div` in `App.jsx` applies `.dark-mode` or `.light-mode` as a CSS class based on the context value, making global theme changes instant across the entire UI.

**No prop drilling** — `ThemeSwitcher`, `SunScene`, and `EyesScene` all access theme state directly from context without any props passed through parent components.

---

**Author:** Mark Yosinao
