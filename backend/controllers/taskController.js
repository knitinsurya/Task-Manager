const supabase = require("../config/supabase");

// 🔹 CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const { title, status } = req.body;

    // ✅ validation
    if (!title) {
      return res.status(400).json("Title is required");
    }

    if (!req.user || !req.user.id) {
      console.log("AUTH ERROR: req.user missing");
      return res.status(401).json("Unauthorized");
    }

    console.log("Creating task for user:", req.user.id); // 🔥 debug

    const { data, error } = await supabase
      .from("tasks")
      .insert([
        {
          title,
          status: status || "Pending",
          assignedto: req.user.id   // must match UUID in users table
        }
      ])
      .select();

    if (error) {
      console.log("SUPABASE CREATE ERROR:", error);
      return res.status(400).json(error.message);
    }

    res.json(data);

  } catch (err) {
    console.log("SERVER ERROR:", err);
    res.status(500).json("Server error");
  }
};


// 🔹 GET TASKS
exports.getTasks = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log("SUPABASE GET ERROR:", error);
      return res.status(400).json(error.message);
    }

    res.json(data);

  } catch (err) {
    console.log("SERVER ERROR:", err);
    res.status(500).json("Server error");
  }
};


// 🔹 UPDATE TASK
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("tasks")
      .update(req.body)
      .eq("id", id)
      .select();

    if (error) {
      console.log("SUPABASE UPDATE ERROR:", error);
      return res.status(400).json(error.message);
    }

    res.json(data);

  } catch (err) {
    console.log("SERVER ERROR:", err);
    res.status(500).json("Server error");
  }
};