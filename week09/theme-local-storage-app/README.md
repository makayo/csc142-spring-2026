cat > README.md << 'EOF'

# useLocalStorage Hook — Theme Switcher

A React application that upgrades the Global Theme Switcher with a custom `useLocalStorage` hook, so the dark/light mode preference persists across page refreshes.

## Overview

When you toggle the theme:

- **Light mode** — a bright sunny day scene with an animated sun and floating clouds
- **Dark mode** — a pitch black scene with glowing white eyes that look left and right, blink, and after 2 seconds a creepy white grin appears

The selected theme is saved to `localStorage` automatically, so refreshing the page never resets it back to light mode.

## What is useLocalStorage?

`useLocalStorage` is a custom React hook that works exactly like `useState`, except it automatically reads from and writes to the browser's `localStorage`. This means user preferences survive page refreshes without any extra work in the component.

## Features

- `useLocalStorage` — custom hook that persists state to `localStorage`
- `ThemeContext` — global theme state using `createContext` and `useLocalStorage`
- `ThemeProvider` — wraps the entire app and exposes `theme` and `toggleTheme`
- `ThemeSwitcher` — button component that reads context and triggers the toggle
- `localStorage` for theme persistence across page refreshes
- Animated sun with rays and floating clouds in light mode
- Glowing blinking eyes with delayed smile reveal in dark mode

## Tech Stack

- React 19
- Vite
- React Context API (`createContext`, `useContext`)
- `localStorage` for theme persistence
- Vitest + React Testing Library

## Getting Started

npm install
npm run dev

Open http://localhost:5173

## Running Tests

npm test

6 tests directly testing the `useLocalStorage` hook:

**Normal cases**

1. Returns `initialValue` when nothing is stored
2. Saves value to `localStorage` when updated
3. Loads existing value from `localStorage` on mount

**Edge cases**

4. Handles storing objects, not just strings
5. Falls back to `initialValue` when `localStorage` has corrupt JSON
6. Two different keys don't overwrite each other

## Project Structure

src/
├── useLocalStorage.js # custom hook — reads/writes to localStorage
├── useLocalStorage.test.js # Vitest test suite for useLocalStorage hook
├── ThemeContext.jsx # createContext + ThemeProvider + useLocalStorage
├── ThemeSwitcher.jsx # toggle button — reads theme via useContext
├── App.jsx # root — wrapped in ThemeProvider, applies CSS class
├── App.css # .light-mode and .dark-mode class definitions
├── components/
│ ├── SunScene.jsx # animated sunny day scene for light mode
│ └── EyesScene.jsx # glowing eyes + smile scene for dark mode
└── setupTests.js

## Key Concepts Demonstrated

**Custom hook** — `useLocalStorage` wraps `useState` with `localStorage` read/write. State is initialized from storage on mount and saved on every update.

**Context setup** — `ThemeContext` is provided at the root level via `ThemeProvider`. Any component calls `useTheme()` to access the current theme and toggle function directly.

**Dynamic styling** — the root `div` in `App.jsx` applies `.dark-mode` or `.light-mode` as a CSS class based on the context value.

**Theme persistence** — switching themes and refreshing the page retains the last selected theme via `localStorage`.

**No prop drilling** — `ThemeSwitcher`, `SunScene`, and `EyesScene` all access theme state directly from context.

---

**Author:** Mark Yosinao
EOF
