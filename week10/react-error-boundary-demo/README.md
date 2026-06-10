# Week 10 - React Error Boundary Lab

## Overview

This project demonstrates React Error Boundaries using a simulated social media dashboard.  
The WeatherWidget intentionally crashes to demonstrate fault isolation and recovery.

---

## Features

- Error Boundary using class components
- Fault isolation (one widget crash does not break app)
- Graceful fallback UI
- Reset and recovery system using React keys

---

## 🧪 Testing

### Normal Case

- App loads normally with all widgets visible

### Edge Case 1: Widget Crash

- Clicking "Simulate Failure" triggers an error
- Error Boundary catches it
- Only WeatherWidget is replaced

### Edge Case 2: Reset Recovery

- Clicking "Reset Widget" restores functionality
- Widget remounts cleanly

### Edge Case 3: Rapid Interaction

- Multiple reset attempts do not break the app
- No infinite crash loop occurs

---

## 🚀 How to Run

```bash
npm install
npm run dev
```
