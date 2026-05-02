const router = require("express").Router();
const Task = require("../models/Task"); // now uses Supabase functions
const auth = require("../middleware/authMiddleware");

// 🔹 Create Task
router.post("/", auth, async (req, res) => {
  try {
    const task = await Task.createTask({
      ...req.body,
      assignedTo: req.user.id   // optional: assign to logged-in user
    });

    res.json(task);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// 🔹 Get all tasks
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.getTasks();
    res.json(tasks);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// 🔹 Update task
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Task.updateTask(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// 🔹 Delete task (optional but useful)
router.delete("/:id", auth, async (req, res) => {
  try {
    await Task.deleteTask(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;