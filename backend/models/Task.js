const supabase = require("../config/supabase");

// 🔹 Create Task
exports.createTask = async (taskData, userId) => {
  try {
    if (!taskData.title) {
      throw new Error("Title is required");
    }

    const { data, error } = await supabase
      .from("tasks")
      .insert([
        {
          title: taskData.title,
          status: taskData.status || "Pending",
          assignedto: userId   // 🔥 always controlled
        }
      ])
      .select();

    if (error) {
      console.log("SUPABASE CREATE ERROR:", error);
      throw new Error(error.message);
    }

    return data[0];

  } catch (err) {
    console.log("SERVICE ERROR:", err.message);
    throw err;
  }
};


// 🔹 Get all tasks
exports.getTasks = async () => {
  try {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log("SUPABASE GET ERROR:", error);
      throw new Error(error.message);
    }

    return data;

  } catch (err) {
    console.log("SERVICE ERROR:", err.message);
    throw err;
  }
};


// 🔹 Update task
exports.updateTask = async (id, updates) => {
  try {
    const { data, error } = await supabase
      .from("tasks")
      .update(updates)
      .eq("id", id)
      .select();

    if (error) {
      console.log("SUPABASE UPDATE ERROR:", error);
      throw new Error(error.message);
    }

    return data[0];

  } catch (err) {
    console.log("SERVICE ERROR:", err.message);
    throw err;
  }
};


// 🔹 Delete task
exports.deleteTask = async (id) => {
  try {
    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", id);

    if (error) {
      console.log("SUPABASE DELETE ERROR:", error);
      throw new Error(error.message);
    }

  } catch (err) {
    console.log("SERVICE ERROR:", err.message);
    throw err;
  }
};