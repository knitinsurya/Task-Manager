const router = require("express").Router();
const { signup, login } = require("../controllers/authController");

// 🔹 Signup
router.post("/signup", async (req, res) => {
  try {
    await signup(req, res);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔹 Login
router.post("/login", async (req, res) => {
  try {
    await login(req, res);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;