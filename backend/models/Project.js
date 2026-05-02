const supabase = require("../config/supabase");

// 🔹 Create Project
exports.createProject = async (projectData) => {
  const { data, error } = await supabase
    .from("projects")
    .insert([projectData])
    .select();

  if (error) throw error;
  return data[0];
};

// 🔹 Get all projects
exports.getProjects = async () => {
  const { data, error } = await supabase
    .from("projects")
    .select("*");

  if (error) throw error;
  return data;
};

// 🔹 Get projects by user (optional but useful)
exports.getProjectsByUser = async (userId) => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("createdBy", userId);

  if (error) throw error;
  return data;
};

// 🔹 Update project
exports.updateProject = async (id, updates) => {
  const { data, error } = await supabase
    .from("projects")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) throw error;
  return data[0];
};

// 🔹 Delete project
exports.deleteProject = async (id) => {
  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id);

  if (error) throw error;
};