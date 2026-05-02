import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Load projects
  const load = async () => {
    try {
      setLoading(true);
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.log("Load error:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // 🔹 Create project
  const create = async () => {
    if (!name.trim()) return;

    try {
      await API.post("/projects", { name });
      setName("");
      load();
    } catch (err) {
      console.log("Create error:", err.response?.data);
    }
  };

  return (
    <div style={styles.page}>
      <Navbar />

      <div style={styles.container}>
        <h2 style={styles.heading}>Projects 📁</h2>

        {/* 🔹 Create Project */}
        <div style={styles.inputBox}>
          <input
            placeholder="Enter project name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
          <button onClick={create} style={styles.addBtn}>
            Create
          </button>
        </div>

        {/* 🔹 Loading */}
        {loading && <p>Loading projects...</p>}

        {/* 🔹 Empty State */}
        {!loading && projects.length === 0 && (
          <p style={{ textAlign: "center" }}>No projects yet 🚀</p>
        )}

        {/* 🔹 Project List */}
        <div style={styles.list}>
          {projects.map((p) => (
            <div key={p.id} style={styles.card}>
              <h4 style={{ margin: 0 }}>{p.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "#f3f4f6",
    minHeight: "100vh",
  },
  container: {
    maxWidth: "600px",
    margin: "auto",
    padding: "20px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  inputBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  addBtn: {
    padding: "10px 15px",
    border: "none",
    background: "#4f46e5",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  card: {
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
};