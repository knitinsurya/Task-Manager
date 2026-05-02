import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Load tasks
  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get("/tasks");
        setTasks(res.data);
      } catch (err) {
        console.log("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // 🔹 Stats
  const completed = tasks.filter((t) => t.status === "Completed").length;
  const pending = tasks.length - completed;

  // 🔹 Overdue (bonus feature 🔥)
  const overdue = tasks.filter(
    (t) =>
      t.dueDate &&
      new Date(t.dueDate) < new Date() &&
      t.status !== "Completed"
  ).length;

  return (
    <div style={styles.page}>
      <Sidebar />

      <div style={styles.container}>
        <h2 style={styles.heading}>Dashboard 📊</h2>

        {/* 🔹 Loading */}
        {loading && <p>Loading dashboard...</p>}

        {/* 🔹 Stats Cards */}
        {!loading && (
          <div style={styles.cards}>
            <div style={styles.card}>
              <h3>Total Tasks</h3>
              <p>{tasks.length}</p>
            </div>

            <div style={{ ...styles.card, background: "#16a34a", color: "#fff" }}>
              <h3>Completed</h3>
              <p>{completed}</p>
            </div>

            <div style={{ ...styles.card, background: "#f59e0b", color: "#fff" }}>
              <h3>Pending</h3>
              <p>{pending}</p>
            </div>

            <div style={{ ...styles.card, background: "#dc2626", color: "#fff" }}>
              <h3>Overdue</h3>
              <p>{overdue}</p>
            </div>
          </div>
        )}

        {/* 🔹 Recent Tasks */}
        {!loading && tasks.length > 0 && (
          <div style={styles.section}>
            <h3>Recent Tasks</h3>

            {tasks.slice(0, 5).map((t) => (
              <div key={t.id} style={styles.taskItem}>
                <span>{t.title}</span>

                <span
                  style={{
                    ...styles.status,
                    background:
                      t.status === "Completed" ? "#16a34a" : "#f59e0b",
                  }}
                >
                  {t.status}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* 🔹 Empty state */}
        {!loading && tasks.length === 0 && (
          <p style={{ textAlign: "center" }}>No tasks available 🚀</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    background: "#f3f4f6",
    minHeight: "100vh",
  },
  container: {
    flex: 1,
    padding: "30px",
  },
  heading: {
    marginBottom: "20px",
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },
  card: {
    padding: "20px",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  section: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  taskItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid #eee",
  },
  status: {
    padding: "4px 8px",
    borderRadius: "6px",
    color: "#fff",
    fontSize: "12px",
  },
};