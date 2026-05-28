import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5000/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [filter, setFilter] = useState("all");

  // Load tasks from backend
  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  }

  // Add task
  async function addTask() {
    if (!taskInput.trim()) {
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: taskInput,
        }),
      });

      if (response.ok) {
        setTaskInput("");
        fetchTasks();
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  }

  // Toggle task completion
  async function toggleTask(id) {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
      });

      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }

  // Delete task
  async function deleteTask(id) {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  // Clear completed tasks
  async function clearCompleted() {
    try {
      await fetch(`${API_URL}/completed`, {
        method: "DELETE",
      });

      fetchTasks();
    } catch (error) {
      console.error("Error clearing tasks:", error);
    }
  }

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") {
      return !task.completed;
    }

    if (filter === "completed") {
      return task.completed;
    }

    return true;
  });

  const remainingTasks = tasks.filter(
    (task) => !task.completed
  ).length;

  return (
    <div className="app">
      <h1>Todo List</h1>
      <p className="subtitle"></p>

      <div className="input-container">
        <input
          type="text"
          placeholder="Enter a task..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTask();
            }
          }}
        />

        <button onClick={addTask}>
          Add
        </button>
      </div>

      <div className="filters">
        <button onClick={() => setFilter("all")}>
          All
        </button>

        <button onClick={() => setFilter("active")}>
          Active
        </button>

        <button onClick={() => setFilter("completed")}>
          Completed
        </button>
      </div>

      <p>{remainingTasks} tasks remaining</p>

      <ul>
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className={task.completed ? "completed" : ""}
          >
            <span
              onClick={() => toggleTask(task.id)}
            >
              {task.text}
            </span>

            <button
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <button
        className="clear-button"
        onClick={clearCompleted}
      >
        Clear Completed
      </button>
    </div>
  );
}

export default App;