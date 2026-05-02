import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Load tasks
  const load = async () => {
    try {
      setLoading(true);
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log("Load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // 🔹 Create task
  const create = async () => {
    if (!title.trim()) return;

    try {
      await API.post("/tasks", {
        title,
        status: "Pending"
      });

      setTitle("");
      load();
    } catch (err) {
      console.log("Create error:", err);
    }
  };

  // 🔹 Update status
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/tasks/${id}`, { status });
      load();
    } catch (err) {
      console.log("Update error:", err);
    }
  };

  return (
    <div style={styles.page}>
      <Navbar />

      <div style={styles.container}>
        <h2 style={styles.heading}>Task Manager 📋</h2>

        {/* 🔹 Add Task */}
        <div style={styles.inputBox}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter new task..."
            style={styles.input}
          />
          <button onClick={create} style={styles.addBtn}>
            Add Task
          </button>
        </div>

        {/* 🔹 Loading */}
        {loading && <p>Loading tasks...</p>}

        {/* 🔹 Empty */}
        {!loading && tasks.length === 0 && (
          <p style={{ textAlign: "center" }}>No tasks yet 🚀</p>
        )}

        {/* 🔹 Task List */}
        <div style={styles.taskList}>
          {tasks.map((t) => (
            <div key={t.id} style={styles.card}>
              <div>
                <h4 style={{ margin: 0 }}>{t.title}</h4>
                <span
                  style={{
                    ...styles.status,
                    background:
                      t.status === "Completed" ? "#16a34a" : "#f59e0b"
                  }}
                >
                  {t.status}
                </span>
              </div>

              <button
                style={styles.doneBtn}
                onClick={() =>
                  updateStatus(
                    t.id,
                    t.status === "Completed" ? "Pending" : "Completed"
                  )
                }
              >
                {t.status === "Completed" ? "Undo" : "Mark Done"}
              </button>
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
  },
  taskList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  status: {
    padding: "4px 8px",
    borderRadius: "5px",
    color: "#fff",
    fontSize: "12px",
    marginTop: "5px",
    display: "inline-block",
  },
  doneBtn: {
    border: "none",
    background: "#111827",
    color: "#fff",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};