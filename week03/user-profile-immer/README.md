````markdown id="r7v2qk"
# 👤 User Profile Dashboard (React + Vite + Immer)

A modern React application demonstrating advanced state management with Immer (`use-immer`).  
This project showcases how to efficiently handle deeply nested state, UI mode control, and real-time state visualization in a clean, production-style interface.

---

## ⚙️ Tech Stack

- React
- Vite
- Immer / use-immer
- JavaScript (ES Modules)

---

## 🎯 Project Overview

This application simulates a user profile management dashboard where state is structured, interactive, and fully reactive.

It focuses on:

- Managing deeply nested state objects
- Simplifying immutable updates using Immer
- Separating UI state from domain data
- Implementing edit vs view (lock) modes
- Real-time state inspection for debugging transparency

---

## 🧠 Key Features

- 👤 Editable user profile (name, email)
- 📞 Nested contact information (phone, address)
- ⚙️ User preferences (newsletter, notifications)
- 🔒 Toggleable edit / view mode (lock system)
- 📊 Live JSON state inspector (real-time updates)
- 🧩 Immutable state handling with `useImmer`

---

## 🏗️ Project Structure

```text
src/
 ├── main.jsx
 ├── App.jsx
 └── UserProfileWithImmer.jsx
````

---

## ⚡ Core Concept: Why Immer?

Managing nested state in React can become verbose and error-prone:

```js
setState({
  ...state,
  contactDetails: {
    ...state.contactDetails,
    phone: "updated value",
  },
});
```

With Immer, state updates become direct and readable:

```js
draft.contactDetails.phone = "updated value";
```

### Benefits

* Cleaner and more readable code
* Reduced risk of mutation bugs
* Easier management of nested structures
* Scales well for complex state systems

---

## 🔍 Live State Inspector

The application includes a real-time JSON viewer that:

* Displays the entire application state
* Updates instantly on every user interaction
* Helps visualize nested state changes
* Supports debugging and state transparency

---

## 🧪 Behavior Overview

### Edit Mode

* All inputs are enabled
* User can modify profile data
* State updates are reflected instantly in JSON view

### View Mode (Locked)

* Inputs are disabled
* Data becomes read-only
* Prevents accidental modifications

---

## 🧩 State Design

```json
{
  "viewMode": "edit",
  "name": "",
  "email": "",
  "contactDetails": {
    "phone": "",
    "address": ""
  },
  "preferences": {
    "newsletter": false,
    "notifications": false
  }
}
```

---

## 🧪 Test Cases

## ✅ Normal Test Cases

### 1. Update Basic Information

**Steps:**

* Enter name: `Jo`
* Enter email: `jo@email.com`

**Expected Result:**

* Name and email update instantly
* JSON viewer reflects changes in real time

---

### 2. Update Contact Details

**Steps:**

* Enter phone number
* Enter address

**Expected Result:**

* Nested `contactDetails` updates correctly
* JSON viewer reflects updated structure

---

### 3. Toggle Preferences

**Steps:**

* Toggle newsletter checkbox
* Toggle notifications checkbox

**Expected Result:**

* Boolean values update correctly
* Changes appear instantly in JSON viewer

---

## ⚠️ Edge Case Tests

### 1. Empty Input Handling

**Steps:**

* Clear name and email fields

**Expected Result:**

* Fields become empty strings
* App remains stable with no rendering issues

---

### 2. Rapid Toggle Interaction

**Steps:**

* Rapidly toggle checkboxes multiple times

**Expected Result:**

* State remains consistent
* Final value matches last interaction

---

### 3. Lock / Unlock Mode Switching

**Steps:**

* Switch to view mode (locked)
* Attempt edits
* Switch back to edit mode

**Expected Result:**

* Inputs disable in view mode
* No updates allowed while locked
* Editing resumes after unlocking

---

## 🚀 Highlights

* Clean separation of UI and data state
* Scalable architecture for complex forms
* Real-time state visualization
* Production-style interaction patterns
* Efficient immutable state handling

---

## 📌 Summary

This project demonstrates practical React state architecture using Immer, focusing on clarity, scalability, and real-time observability of nested application state.

```
