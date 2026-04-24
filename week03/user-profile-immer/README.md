# 👤 User Profile State Management Dashboard (React + Vite + Immer)

A modern React application demonstrating advanced state management with Immer (`use-immer`).  
This project focuses on managing deeply nested state structures while maintaining clean, predictable, and scalable UI state logic.

---

## 🎯 Objective

This project demonstrates how to manage **deeply nested object state in React using `useImmer`**, with an emphasis on simplifying complex updates in structured user data systems.

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

## 🧠 Key Features

- 👤 Editable user profile (name, email)
- 📞 Nested contact information (phone, address)
- ⚙️ User preferences (newsletter, notifications)
- 🔒 Toggleable edit / view mode (lock system)
- 📊 Live JSON state inspector (real-time updates)
- 🧩 Immutable state handling with `useImmer`

---

## 🧩 State Architecture

The application state is managed as a single Immer-driven object:

- **UI state** → `viewMode`
- **Form state** → `name`, `email`
- **Nested data** → `contactDetails`, `preferences`

This structure keeps all related data centralized while maintaining clear separation of concerns.

---

## 🏗️ Project Structure

```text
src/
 ├── main.jsx
 ├── App.jsx
 └── UserProfileWithImmer.jsx
```

---

## ⚡ Core Concept: Why Immer?

Traditional React state updates require manual immutable copying:

```js
setState({
  ...state,
  contactDetails: {
    ...state.contactDetails,
    phone: "updated value",
  },
});
```

With Immer, updates become direct and readable:

```js
draft.contactDetails.phone = "updated value";
```

### Benefits

- Cleaner and more maintainable code
- Eliminates deep spread operator chains
- Reduces risk of accidental mutations
- Scales effectively for complex state trees

---

## ⚡ Design Note

This application intentionally uses a single centralized Immer state tree to avoid:

- Prop drilling
- Fragmented state logic
- Duplicate or inconsistent state sources

---

## 🔍 Live State Inspector

The application includes a real-time JSON viewer that:

- Displays the complete application state
- Updates instantly on every user interaction
- Helps visualize nested state changes
- Supports debugging and state transparency

---

## 🧪 Testing

This section validates correct behavior of state updates, Immer integration, and UI interaction logic.

---

## ✅ Normal Test Cases

### 1. Update Basic Information

**Steps:**
- Enter a name (e.g., `Alex`)
- Enter an email (e.g., `alex@email.com`)

**Expected Result:**
- State updates immediately
- JSON viewer reflects changes in real time

---

### 2. Update Nested Contact Details

**Steps:**
- Enter phone number
- Enter address

**Expected Result:**
- `contactDetails.phone` updates correctly
- `contactDetails.address` updates correctly
- Nested structure remains intact

---

### 3. Toggle Preferences

**Steps:**
- Toggle newsletter checkbox
- Toggle notifications checkbox

**Expected Result:**
- Boolean values flip correctly
- Changes are reflected instantly in state viewer

---

## ⚠️ Edge Case Tests

### 1. Empty Input Handling

**Steps:**
- Clear name and email fields

**Expected Result:**
- Fields become empty strings
- App does not crash or break rendering

---

### 2. Rapid State Updates

**Steps:**
- Rapidly type in inputs or toggle checkboxes

**Expected Result:**
- State remains consistent
- No race conditions or UI desync

---

### 3. View Mode Lock Behavior

**Steps:**
- Switch to view mode (locked)
- Attempt to modify fields
- Switch back to edit mode

**Expected Result:**
- Inputs are disabled in view mode
- No state changes occur while locked
- Editing resumes after unlocking

---

## 🚀 Summary

This project demonstrates practical React state architecture using Immer, focusing on clarity, scalability, and real-time observability of nested application state.