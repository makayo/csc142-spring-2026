import { useEffect, useState } from "react";
import "./TaskManager.css";

const STORAGE_KEY = "tasks_v1";

export default function TaskManager() {
  // ================= STATE =================
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
  const [dueDate, setDueDate] = useState("");
  const [filter, setFilter] = useState("all");

  // ================= SAVE =================
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // ================= ADD TASK =================
  const addTask = () => {
    if (!taskInput.trim()) return;

    const newTask = {
      id: Date.now(),
      title: taskInput,
      completed: false,
      priority,
      dueDate: dueDate || null,
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => [...prev, newTask]);

    setTaskInput("");
    setPriority("medium");
    setDueDate("");
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

      {/* INPUT */}
      <div className="input-section">
        <input
          className="input"
          placeholder="Enter task..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />

        <input
          type="date"
          className="input"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        <button className="button" onClick={addTask}>
          Add
        </button>
      </div>

      {/* FILTERS */}
      <div className="filter-section">
        {["all", "active", "completed"].map((f) => (
          <button
            key={f}
            className={filter === f ? "active-filter" : ""}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* TASK LIST */}
      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <p className="empty">No tasks</p>
        ) : (
          filteredTasks.map((task) => (
            <div key={task.id} className={`task ${task.priority}`}>
              {/* ✅ FIXED STRUCTURE */}
              <div className="task-content">
                <span
                  className={`task-title ${task.completed ? "completed" : ""}`}
                >
                  {task.title}
                </span>

                <div className="meta">
                  <span className={`priority-tag ${task.priority}`}>
                    {task.priority.toUpperCase()}
                  </span>

                  {task.dueDate && <small> • Due: {task.dueDate}</small>}
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
