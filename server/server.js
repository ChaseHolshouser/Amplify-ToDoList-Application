const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, "tasks.json");

// Read tasks from JSON file
function readTasks() {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Save tasks to JSON file
function writeTasks(tasks) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}

// GET all tasks
app.get("/api/tasks", (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
});

// CREATE a new task
app.post("/api/tasks", (req, res) => {
  const { text } = req.body;

  // Prevent empty tasks
  if (!text || text.trim() === "") {
    return res.status(400).json({
      error: "Task text is required",
    });
  }

  const tasks = readTasks();

  const newTask = {
    id: crypto.randomUUID(),
    text: text.trim(),
    completed: false,
  };

  tasks.push(newTask);
  writeTasks(tasks);

  res.status(201).json(newTask);
});

// TOGGLE task completion
app.patch("/api/tasks/:id", (req, res) => {
  const { id } = req.params;

  const tasks = readTasks();

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({
      error: "Task not found",
    });
  }

  task.completed = !task.completed;

  writeTasks(tasks);

  res.json(task);
});

// CLEAR completed tasks
app.delete("/api/tasks/completed", (req, res) => {
  const tasks = readTasks();

  const activeTasks = tasks.filter((task) => !task.completed);

  writeTasks(activeTasks);

  res.json(activeTasks);
});

// DELETE a task
app.delete("/api/tasks/:id", (req, res) => {
  const { id } = req.params;

  const tasks = readTasks();

  const filteredTasks = tasks.filter((task) => task.id !== id);

  writeTasks(filteredTasks);

  res.json({
    message: "Task deleted",
  });
});

// Start server only when this file is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;