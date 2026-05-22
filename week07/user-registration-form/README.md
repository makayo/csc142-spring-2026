# User Registration Form with React Hook Form

A client-side user registration form built with React Hook Form, featuring real-time validation, draft caching, and async submission simulation.

## Overview

This project demonstrates uncontrolled, ref-based form architecture using React Hook Form — eliminating manual state management while providing robust validation, cross-field checks, and localStorage draft persistence.

## Features

- Full Name, Email, Password, Confirm Password, Role, and Terms fields
- Real-time validation on all fields
- Password strength enforcement (uppercase, lowercase, number, min 8 chars)
- Confirm Password cross-field validation using `watch`
- Role dropdown with required selection
- Terms & Conditions required checkbox
- Auto-focus on Full Name field on mount via `setFocus`
- Draft caching to localStorage using `watch` + `useEffect`
- "Registering..." button state during 2-second simulated API delay
- Form reset and localStorage flush on successful submission

## Tech Stack

- React 19
- Vite
- React Hook Form
- TypeScript
- Vitest + React Testing Library

## Getting Started

npm install
npm run dev

Open http://localhost:5173

## Running Tests

npm test

6 tests — 3 normal, 3 edge cases.

**Normal**

1. Renders all form fields
2. Submits successfully with valid data and resets form
3. Shows "Registering..." during submission

**Edge** 4. Shows error when passwords do not match 5. Shows error for weak password 6. Saves draft to localStorage as user types

## Project Structure

src/
├── components/RegistrationForm.tsx
├── test/
│ ├── setup.ts
│ └── RegistrationForm.test.tsx
└── main.tsx

## Key Concepts

**register** — Connects inputs to React Hook Form without useState.

**watch** — Tracks live field values for password matching and localStorage sync.

**setFocus** — Auto-focuses Full Name on mount.

**isSubmitting** — Drives the "Registering..." button state during async submission.

---

Author: Mark Yosinao
