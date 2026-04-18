import { useEffect, useRef, useState } from "react";
import "./TaskManager.css";

const STORAGE_KEY = "tasks_v6";

export default function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [taskInput, setTaskInput] = useState("");
  const [priority, setPriority] = useState("medium");
  const [filter, setFilter] = useState("active");

  // ================= REFS =================
  const listRef = useRef(null);
  const prevLengthRef = useRef(tasks.length);

  // ================= SAVE =================
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // ================= SMART AUTO-SCROLL =================
  useEffect(() => {
    const prevLength = prevLengthRef.current;
    const currentLength = tasks.length;

    // ONLY scroll when a task is ADDED
    if (currentLength > prevLength) {
      if (listRef.current) {
        listRef.current.scrollTop = listRef.current.scrollHeight;
      }
    }

    prevLengthRef.current = currentLength;
  }, [tasks]);

  // ================= ADD TASK =================
  const addTask = () => {
    if (!taskInput.trim()) return;

    const newTask = {
      id: Date.now(),
      title: taskInput,
      priority,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => [...prev, newTask]);
    setTaskInput("");
    setPriority("medium");
  };

  // ================= TOGGLE =================
  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  // ================= DELETE =================
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // ================= FILTER =================
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  // ================= UI =================
  return (
    <div className="task-container">
      <h2 className="title">Task Manager</h2>

      <div className="input-section">
        <input
          className="input"
          placeholder="Enter task..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />

        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button className="button" onClick={addTask}>
          Add
        </button>
      </div>

      <div className="filter-section">
        {["active", "completed"].map((f) => (
          <button
            key={f}
            className={filter === f ? "active-filter" : ""}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* SCROLL AREA */}
      <div
        className="task-list"
        ref={listRef}
        style={{ maxHeight: "400px", overflowY: "auto" }}
      >
        {filteredTasks.length === 0 ? (
          <p className="empty">No tasks</p>
        ) : (
          filteredTasks.map((task) => (
            <div key={task.id} className={`task ${task.priority}`}>
              <div>
                <span
                  className={`task-title ${task.completed ? "completed" : ""}`}
                >
                  {task.title}
                </span>

                <div className="meta">
                  <span className={`priority-tag ${task.priority}`}>
                    {task.priority.toUpperCase()}
                  </span>

                  <small>{new Date(task.createdAt).toLocaleString()}</small>
                </div>
              </div>

              <div className="actions">
                <button onClick={() => toggleTask(task.id)}>
                  {task.completed ? "Undo" : "Done"}
                </button>

                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
