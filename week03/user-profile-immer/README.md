# 👤 User Profile State Management Dashboard (React + Vite + Immer)

A modern React application demonstrating advanced state management with Immer (`use-immer`).
This project focuses on managing deeply nested state structures while maintaining clean, predictable, and scalable UI state logic.

---

## 🎯 Objective

This project demonstrates how to manage deeply nested object state in React using useImmer, with an emphasis on simplifying complex updates in structured user data systems.

It is designed to strengthen practical understanding of:

- Managing deeply nested state objects in React applications
- Simplifying immutable updates using Immer’s draft mutation model
- Separating UI state (edit/view mode) from domain data
- Designing scalable, form-like state architectures
- Improving state observability through real-time inspection

---

## ⚙️ Tech Stack

- React
- Vite
- Immer / use-immer
- JavaScript (ES Modules)

---

## 🚀 How to Setup & Run

1. Create project:
   npm create vite@latest user-profile-immer -- --template react

2. Go into folder:
   cd user-profile-immer

3. Install dependencies:
   npm install
   npm install use-immer immer

4. Add your component:
   Place UserProfileWithImmer.jsx inside src/

5. Ensure main entry:
   main.jsx should render <UserProfileWithImmer />

6. Run project:
   npm run dev

7. Open in browser:
   http://localhost:5173

---

## 🧠 Key Features

- Editable user profile (name, email)
- Nested contact details (phone, address)
- User preferences (newsletter, notifications)
- Edit / View mode toggle
- Save / Cancel workflow
- Live JSON state inspector
- Immer-based nested state updates

---

## 🧩 State Architecture

Single centralized state object:

- viewMode → controls UI mode
- saved → committed data
- draft → editable working copy
- contactDetails → nested object
- preferences → nested object

---

## ⚡ Why Immer

Without Immer:
Manual deep copying is required for nested updates.

With Immer:
You directly mutate draft state safely.

Benefits:

- less boilerplate
- easier nested updates
- safer immutable logic
- scalable state design

---

## ⚡ App Flow

1. View mode (read-only saved data)
2. Click Edit → loads saved into draft
3. Modify draft fields
4. Save → draft becomes saved
5. Cancel → discard draft changes

---

## 🔍 Live State Inspector

Displays:

- saved data
- draft data
- viewMode

Updates in real time for debugging.

---

## 🧪 Testing

## Normal Cases

1. Create user

- enter all fields
- click save
- verify saved state updates

2. Edit user

- click edit
- modify fields
- save changes

3. Cancel edit

- modify fields
- cancel
- verify no changes saved

---

## Edge Cases

1. Empty inputs

- clear all fields
- save
- app should not crash

2. Rapid typing

- fast input changes
- state remains stable

3. Partial update

- update only one field
- other fields remain unchanged

---

## 🚀 Summary

This project demonstrates a production-style React form system using Immer with:

- draft vs saved separation
- real-world edit/save/cancel workflow
- nested state handling
- clean scalable architecture
