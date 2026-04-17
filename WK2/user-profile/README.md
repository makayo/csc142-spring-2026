# Week 02 - User Profile App

## 📌 Overview
This project is a React-based user profile management application built using Vite. It demonstrates state management, controlled inputs, and nested object updates.

Users can update:
- Name  
- Email  
- Address (street, city, country)  

All updates are reflected in real time through React state.

---

## 🚀 Features
- Controlled form inputs
- React `useState` for state management
- Nested state updates (address object)
- Real-time UI updates
- Profile image display
- Clean two-column layout (form + preview)

---

## 🧠 Key Concepts
- React functional components
- `useState` hook
- Controlled components (forms)
- Immutable state updates
- Nested object state handling
- Component layout using CSS

---

## 🧪 Test Cases

### ✅ Normal Test Cases

**1. Update Name**
- Input: "Alice"
- Action: Click Update
- Expected Result: Name updates in profile display

**2. Update Email**
- Input: "alice@gmail.com"
- Action: Click Update
- Expected Result: Email updates in profile display

**3. Update Full Address**
- Input:
  - Street: 500 Pine St  
  - City: Seattle  
  - Country: USA  
- Action: Click Update Address  
- Expected Result: All address fields update correctly

---

### ⚠️ Edge Cases

**1. Empty Input Submission**
- Action: Click update with empty input fields  
- Expected Result: Previous values remain unchanged  

**2. Partial Address Update**
- Input: Only City = "Portland"  
- Action: Click Update Address  
- Expected Result: Only provided field updates, others remain unchanged  

**3. Rapid Button Clicking**
- Action: Click update buttons multiple times quickly  
- Expected Result: No crashes or UI issues occur  

---

## 📁 Project Structure
src/
│── assets/user-icon.png
│── UserProfile.jsx
│── UserProfile.css
│── App.jsx

---

## ▶️ Run Project

```bash
npm install
npm run dev
```