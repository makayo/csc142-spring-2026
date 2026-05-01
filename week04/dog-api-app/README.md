# 🐶 Dog Explorer — Week 04

A React application built with **Vite** and **TanStack Query** that fetches and displays dog breed data from the [Dog API](https://dogapi.dog/api/v2).

---

## Features

- Browse a list of dog breeds via dropdown
- View detailed breed info: name, description, life expectancy, weight range, and hypoallergenic status
- Load and toggle random dog facts
- Load and toggle breed groups in a 3-column layout
- Full loading, error, and success state handling on every query
- Dark mode support via `prefers-color-scheme`

---

## Tech Stack

- [React](https://react.dev/) via [Vite](https://vitejs.dev/)
- [TanStack Query v5](https://tanstack.com/query/latest)
- [Dog API v2](https://dogapi.dog/)

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Install TanStack Query

```bash
npm install @tanstack/react-query
```

### 3. Start the dev server

```bash
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Project Structure

```
src/
├── api/
│   └── dogApi.js       # Fetch functions for all API endpoints
├── App.css             # Component styles using CSS variables
├── App.jsx             # Main app component
├── index.css           # Global styles and CSS variables
└── main.jsx            # App entry point with QueryClientProvider
```

---

## Test Cases

### ✅ Normal Cases

| # | Test | Expected Result | Status |
|---|------|----------------|--------|
| 1 | App loads in browser | Breed dropdown renders with a full list of breeds | ✅ Pass |
| 2 | Select a breed from the dropdown | Breed card appears showing name, description, life expectancy, weight, and hypoallergenic status | ✅ Pass |
| 3 | Click the **facts** button | Facts panel appears with a list of dog facts | ✅ Pass |
| 4 | Click the **groups** button | Groups panel appears with breed groups in a 3-column layout | ✅ Pass |
| 5 | Click an active button (facts or groups) | Panel toggles off and hides | ✅ Pass |
| 6 | Switch from one breed to another | Breed card updates with new breed's details | ✅ Pass |

---

### ⚠️ Edge Cases

| # | Test | Expected Result | Status |
|---|------|----------------|--------|
| 1 | Breed with no description in the API response | Card displays `"No description available."` instead of blank | ✅ Pass |
| 2 | Breed with missing life or weight data | Attribute fields display `"—"` instead of crashing | ✅ Pass |
| 3 | Open facts, then open groups — both active | Both panels render stacked vertically, facts on top | ✅ Pass |
| 4 | Toggle facts off then on again | Panel re-renders from cache with no extra API call | ✅ Pass |
| 5 | Network request fails (simulated by disabling network in DevTools) | Error message displays: `"Failed to load breeds."` / `"Failed to load facts."` etc. | ✅ Pass |
| 6 | No breed selected in dropdown | No breed card renders — UI shows only the empty dropdown with placeholder text | ✅ Pass |

---

## API Endpoints Used

| Endpoint | Description |
|----------|-------------|
| `GET /api/v2/breeds` | Fetch all dog breeds |
| `GET /api/v2/breeds/:id` | Fetch details for a specific breed |
| `GET /api/v2/facts` | Fetch random dog facts |
| `GET /api/v2/groups` | Fetch breed groups |