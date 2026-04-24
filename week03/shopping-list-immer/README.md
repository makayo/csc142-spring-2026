# 🛒 Shopping List Manager (React + Vite + Immer)

A modern React application demonstrating advanced state management with Immer (`use-immer`).  
This project showcases how to efficiently handle dynamic lists, nested state, UI mode control, and real-time state visualization in a clean, production-style interface.

---

## ⚙️ Tech Stack

- React
- Vite
- Immer / use-immer
- JavaScript (ES Modules)

---

## 🎯 Project Overview

This application simulates a structured shopping list system where state is interactive, scalable, and fully reactive.

It focuses on:

- Managing dynamic lists with nested objects
- Simplifying immutable updates using Immer
- Separating UI state from application data
- Implementing edit vs view (lock) mode control
- Real-time state inspection for debugging and transparency

---

## 🧠 Key Features

- 🛒 Add items with name, quantity, category, and notes
- 🗑️ Remove items from the list
- ✏️ Edit item notes inline
- 🔒 Toggleable edit / view mode (lock system)
- 📊 Live JSON state inspector (real-time updates)
- 🧩 Immutable state handling with `useImmer`

---

## 🏗️ Project Structure

```text
src/
 ├── main.jsx
 ├── ShoppingListWithImmer.jsx
 ├── style.css
 └── assets/
```

---

## ⚡ Core Concept: Why Immer?

Managing nested state in React can become verbose and error-prone:

```js
setState({
  ...state,
  items: state.items.map(item =>
    item.id === id
      ? { ...item, details: { ...item.details, notes: "updated value" } }
      : item
  ),
});
```

With Immer, state updates become direct and readable:

```js
draft.items[i].details.notes = "updated value";
```

### Benefits

- Cleaner and more readable code
- Reduced risk of mutation bugs
- Easier management of nested structures
- Scales well for complex state systems

---

## 🔍 Live State Inspector

The application includes a real-time JSON viewer that:

- Displays the entire application state
- Updates instantly on every user interaction
- Helps visualize nested state changes
- Supports debugging and state transparency

---

## 🧪 Behavior Overview

### Edit Mode

- All inputs are enabled
- Items can be added, edited, or removed
- State updates are reflected instantly in JSON view

### View Mode (Locked)

- Inputs are disabled
- Data becomes read-only
- Prevents accidental modifications

---

## 🧩 State Design

```json
{
  "viewMode": "edit",
  "form": {
    "name": "",
    "quantity": 1,
    "category": "",
    "notes": ""
  },
  "items": [
    {
      "id": 123456,
      "name": "Milk",
      "quantity": 2,
      "details": {
        "category": "Dairy",
        "notes": "Whole milk preferred"
      }
    }
  ]
}
```

---

## 🧪 Test Cases

## ✅ Normal Test Cases

### 1. Add Item

**Steps:**

- Enter item details (name, quantity, category, notes)
- Click "Add Item"

**Expected Result:**

- Item appears in the list
- JSON viewer updates instantly

---

### 2. Remove Item

**Steps:**

- Click "Delete" on an item

**Expected Result:**

- Item is removed from UI and state

---

### 3. Edit Item Notes

**Steps:**

- Click "Edit Notes"
- Modify note text
- Save changes

**Expected Result:**

- Notes update in UI
- JSON viewer reflects changes

---

## ⚠️ Edge Case Tests

### 1. Empty Name Prevention

**Steps:**

- Try adding an item without a name

**Expected Result:**

- Item is not created
- App remains stable

---

### 2. Rapid Add/Delete Actions

**Steps:**

- Quickly add and delete multiple items

**Expected Result:**

- State remains consistent
- No UI or data corruption

---

### 3. Lock Mode Enforcement

**Steps:**

- Switch to view mode
- Attempt editing inputs or notes

**Expected Result:**

- Inputs are disabled
- No state updates occur

---

## 🚀 Highlights

- Clean separation of UI and data state
- Scalable architecture for dynamic lists
- Real-time state visualization
- Production-style interaction patterns
- Efficient immutable state handling

---

## 📌 Summary

This project demonstrates practical React state architecture using Immer, focusing on clarity, scalability, and real-time observability of nested application state.