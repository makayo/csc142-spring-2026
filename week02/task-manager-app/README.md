# Task Manager (React + Vite)

This project is a lightweight task management application built with React and Vite. It allows users to create, prioritize, complete, and delete tasks with persistent storage using localStorage.

The app focuses on clean state management, simple UX behavior, and realistic task workflows similar to modern productivity tools.

---

## 🚀 Features

- Add tasks with priority levels (Low / Medium / High)
- Mark tasks as completed or revert (undo)
- Delete tasks
- Filter tasks by:
  - Active
  - Completed
- Persistent storage using `localStorage`
- Auto-scroll only when new tasks are added (improved UX behavior)
- Priority-based visual styling

---

## 🧠 Core Design

This app uses a simplified state model:

- `active` → not completed
- `completed` → finished tasks

No archive system is used to keep logic simple and predictable.

---

## 🛠️ Tech Stack

- React (Hooks: `useState`, `useEffect`, `useRef`)
- Vite
- Vanilla CSS
- localStorage API

---

## 📂 Project Structure

- `App.jsx` → Main application logic
- `TaskManager.css` → Styling
- `main.jsx` → Entry point

---

## 🧪 Test Cases

### Normal Test Cases

1. Add a task successfully  
   - Input: "Buy groceries"  
   - Priority: medium  
   - Expected: Task appears in Active list with timestamp and persists in localStorage  

2. Mark task as completed  
   - Action: Click "Done"  
   - Expected: Task moves to Completed filter, shows strike-through, button changes to "Undo"  

3. Delete a task  
   - Action: Click "Delete"  
   - Expected: Task is removed from UI and localStorage  

---

### Edge Cases

1. Empty task submission  
   - Action: Click Add with empty input  
   - Expected: No task is created  

2. Very long task input  
   - Input: 500+ characters  
   - Expected: UI remains intact, text wraps properly  

3. Rapid task creation spam  
   - Action: Click Add multiple times quickly  
   - Expected: No duplicates, app remains stable  

---

## 📌 Notes

- Auto-scroll only triggers when a new task is added
- Deleting or completing tasks does not affect scroll position
- Priority is used only for UI styling

---

## 📈 Future Improvements

- Drag & drop ordering
- Due date scheduling
- Calendar view integration
- Search and filtering
- AI-based task prioritization