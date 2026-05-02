const router = require("express").Router();
const Project = require("../models/Project"); // Supabase functions
const auth = require("../middleware/authMiddleware");

// 🔹 Create Project (Admin typically)
router.post("/", auth, async (req, res) => {
  try {
    const project = await Project.createProject({
      name: req.body.name,
      description: req.body.description,
      createdBy: req.user.id
    });

    res.json(project);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// 🔹 Get all projects
router.get("/", auth, async (req, res) => {
  try {
    const projects = await Project.getProjects();
    res.json(projects);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// 🔹 Update project
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Project.updateProject(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// 🔹 Delete project
router.delete("/:id", auth, async (req, res) => {
  try {
    await Project.deleteProject(req.params.id);
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;