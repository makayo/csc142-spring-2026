# React Hook Form + TanStack Query Profile App

A user profile editor built with React Hook Form and TanStack Query, backed by a local JSON Server mock API.

## Overview

This project implements a user profile form that separates server state (TanStack Query) from form state (React Hook Form), with cache invalidation, conflict detection, and a save confirmation toast.

## Features

- Fetches profile data from `http://localhost:3001/profile` on mount
- Form auto-populates via `useEffect + reset()`
- Save Changes button disabled until form is dirty (`isDirty`)
- Button shows "Saving..." during pending mutation (`isPending`)
- `conflict@example.com` triggers a 409 error displayed inline
- Toast confirmation card on successful save

## Tech Stack

- React 19
- Vite
- React Hook Form
- TanStack Query v5
- Axios
- JSON Server
- Vitest + React Testing Library

## Getting Started

### Prerequisites

- Node.js installed
- npm installed

### Step 1 — Install dependencies

```bash
npm install
```

### Step 2 — Start the mock backend (JSON Server)

```bash
npx json-server db.json --port 3001
```

Backend runs at `http://localhost:3001`

> ⚠️ Start this BEFORE the frontend. The app will not load profile data without it.

### Step 3 — Start the frontend (new terminal)

```bash
npm run dev
```

App runs at `http://localhost:5173`

### Step 4 — Open browser

Navigate to `http://localhost:5173`

## Running Tests

Open a third terminal and run:

```bash
npm test
```

### Test Coverage (6 tests)

**Normal cases:**

1. Loads and displays profile data from server
2. Save Changes button disabled when form is pristine
3. Save Changes button enables when a field is modified

**Edge cases:**

4. `conflict@example.com` triggers 409 error under email field
5. Loading state renders while fetch is in progress
6. Error state renders when server fetch fails

## Project Structure

```
src/
├── api/profileApi.ts
├── components/ProfileForm.tsx
├── test/ProfileForm.test.tsx
└── main.tsx

```

## Key Concepts

- **useQuery** — Fetches profile on mount, tracks `isLoading`/`isError`, caches under `["userProfile"]`
- **useMutation** — Wraps PUT request. On success invalidates cache and resets form. On error maps 409 to field error
- **isDirty** — Save button stays disabled until a real change is made
- **setError** — Server validation errors injected directly into form field state

## Author

Mark Yosinao
