# 🚀 React + Vite (Immer State Demo App)

This project is a React + Vite application built to demonstrate advanced state management using Immer (`use-immer`).  
It focuses on handling nested objects, immutable updates, and real-time state inspection through a live JSON viewer.

---

## ⚙️ Tech Stack

- React
- Vite
- Immer / use-immer
- JavaScript (ES Modules)

---

## 🎯 Purpose of This Project

This app demonstrates:

- Managing complex nested state
- Updating state safely using Immer draft mutations
- Building a live state inspector (JSON view)
- Simulating a real-world user profile settings dashboard
- Handling UI state (edit/lock mode) alongside data state

---

## 🧠 Core Features

- 👤 Editable user profile (name, email)
- 📞 Nested contact details (phone, address)
- ⚙️ Preferences toggles (newsletter, notifications)
- 🔒 Lock / unlock edit mode
- 📊 Live JSON state viewer (debug inspector)
- 🧩 Immutable updates via `useImmer`

---

## 🛠️ Project Setup

```bash
npm install
npm run dev
```

### If starting fresh:

```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm install immer use-immer
npm run dev
```

---

## 📁 Project Structure

```text
src/
 ├── main.jsx
 ├── App.jsx
 └── UserProfileWithImmer.jsx
```

---

## ⚡ Key Concept: Why Immer?

Instead of verbose immutable updates:

```js
setState({
  ...state,
  contactDetails: {
    ...state.contactDetails,
    phone: "new",
  },
});
```

You write:

```js
draft.contactDetails.phone = "new";
```

✔ Cleaner
✔ Less error-prone
✔ Easier to maintain

---

## 🔍 Live State Inspector

The app includes a real-time JSON viewer that:

- Displays full nested state
- Updates instantly on every change
- Helps visualize how state evolves

---

## 🧪 Development Notes

- Vite provides fast Hot Module Replacement (HMR)
- React updates render instantly in the browser
- Immer ensures safe immutable state updates under the hood

---

## 📦 Optional Enhancements

- LocalStorage persistence
- Dark mode toggle in preferences
- Form validation (email/phone)
- Animated UI transitions
- Multiple user profiles

---

## 🧪 Testing

This section includes basic functional tests and edge cases to validate state updates, Immer behavior, and UI reliability.

---

## ✅ Normal Test Cases

### 1. Update Basic User Info

**Steps:**

- Enter name: `Jo`
- Enter email: `jo@email.com`

**Expected Result:**

- JSON updates immediately
- `name` and `email` reflect entered values

---

### 2. Update Contact Details

**Steps:**

- Enter phone: `123-456-7890`
- Enter address: `555 B St`

**Expected Result:**

- `contactDetails.phone` updates correctly
- `contactDetails.address` updates correctly
- JSON reflects nested object change

---

### 3. Toggle Preferences

**Steps:**

- Click “Email Updates”
- Click “Notifications”

**Expected Result:**

- Boolean values flip between true/false
- Changes appear instantly in JSON view

---

## ⚠️ Edge Case Tests

### 1. Empty Input Handling

**Steps:**

- Clear name and email fields

**Expected Result:**

- Values become empty strings
- App does not crash or freeze
- JSON still renders correctly

---

### 2. Rapid Toggle Spam

**Steps:**

- Rapidly click “Notifications” checkbox multiple times

**Expected Result:**

- State remains consistent (no race conditions)
- Final value matches last click state

---

### 3. Lock/Unlock State Switching

**Steps:**

- Switch to “view mode” (locked)
- Attempt to edit fields
- Switch back to “edit mode”

**Expected Result:**

- Inputs disabled when locked
- No state changes allowed while locked
- Editing resumes after unlocking

---

## 🧭 Summary

This project demonstrates practical React state management using Immer with real-time debugging and nested data structures in a modern Vite setup.

```

```
