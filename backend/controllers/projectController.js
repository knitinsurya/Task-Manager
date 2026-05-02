const supabase = require("../config/supabase");

// 🔹 CREATE PROJECT
exports.createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    const { data, error } = await supabase
      .from("projects")
      .insert([
        {
          name,
          description,
          createdby: req.user.id   // 🔥 important (lowercase)
        }
      ])
      .select();

    if (error) {
      console.log("CREATE PROJECT ERROR:", error);
      return res.status(400).json(error.message);
    }

    res.json(data);

  } catch (err) {
    console.log("SERVER ERROR:", err);
    res.status(500).json("Server error");
  }
};


// 🔹 GET PROJECTS
exports.getProjects = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*");

    if (error) {
      console.log("GET PROJECT ERROR:", error);
      return res.status(400).json(error.message);
    }

    res.json(data);

  } catch (err) {
    console.log("SERVER ERROR:", err);
    res.status(500).json("Server error");
  }
};