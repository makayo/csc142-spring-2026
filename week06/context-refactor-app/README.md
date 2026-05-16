# Context Refactor App

A React application that demonstrates the difference between **prop drilling** and the **React Context API** for managing shared state across a component tree.

## Overview

This project visualizes two approaches to passing data through a component tree (`App → Dashboard → Sidebar → UserProfile`):

- **Before (Prop Drilling):** The `user` object is passed manually through every component, even those that don't use it
- **After (Context API):** Components access shared state directly via `useContext`, eliminating unnecessary prop chains

## Features

- Interactive component tree diagram showing both approaches side by side
- Live context state editor — edit name, email, and theme preference and watch the UI update in real time
- Component inspector showing before/after code for each node in the tree
- Guided tour walking through each component and explaining the refactor
- Theme toggle (light/dark) managed through context

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
1. UserProfile reads user data from context without any props
2. `toggleTheme` updates `themePreference` across the tree
3. `updateUser` updates a field from a deeply nested component

**Edge cases**
4. `toggleTheme` twice returns to the original theme — no state leak
5. `updateUser` only changes the target field — other fields stay unchanged
6. Updating email does not affect name or theme

## Project Structure

```
src/
├── UserContext.jsx          # Context + UserProvider + updateUser + toggleTheme
├── App.jsx                  # Root — wraps app in UserProvider
├── components/
│   ├── Navbar.jsx           # Theme toggle button
│   ├── Dashboard.jsx        # Main explorer — tree diagram + inspector
│   ├── Sidebar.jsx          # Passes no props (context refactor demo)
│   └── UserProfile.jsx      # Reads user directly from context
└── UserContext.test.jsx     # Vitest test suite
```

## Key Concepts Demonstrated

**Prop drilling problem** — `Dashboard` and `Sidebar` previously received `user` as a prop only to pass it down without using it. Any change to the user shape required updating every component in the chain.

**Context solution** — `UserProvider` holds the user state and exposes it via `UserContext.Provider`. Any component in the tree calls `useContext(UserContext)` to access the data directly, with zero coupling to parent components.