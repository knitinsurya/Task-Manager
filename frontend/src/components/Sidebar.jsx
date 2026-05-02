import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const role = localStorage.getItem("role");
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div style={styles.sidebar}>
      {/* Logo */}
      <h2 style={styles.logo}>TaskFlow</h2>

      {/* Links */}
      <div style={styles.links}>
        <Link
          to="/dashboard"
          style={{
            ...styles.link,
            ...(isActive("/dashboard") && styles.active),
          }}
        >
          📊 Dashboard
        </Link>

        <Link
          to="/tasks"
          style={{
            ...styles.link,
            ...(isActive("/tasks") && styles.active),
          }}
        >
          📋 Tasks
        </Link>

        {role === "Admin" && (
          <Link
            to="/projects"
            style={{
              ...styles.link,
              ...(isActive("/projects") && styles.active),
            }}
          >
            📁 Projects
          </Link>
        )}
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <p style={{ fontSize: "12px", color: "#9ca3af" }}>
          Role: {role || "Guest"}
        </p>
      </div>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "220px",
    height: "100vh",
    background: "linear-gradient(180deg, #1e293b, #111827)",
    color: "#fff",
    padding: "25px 20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxShadow: "4px 0 10px rgba(0,0,0,0.2)",
  },

  logo: {
    margin: 0,
    marginBottom: "30px",
    fontWeight: "bold",
    letterSpacing: "1px",
  },

  links: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  link: {
    textDecoration: "none",
    color: "#cbd5f5",
    padding: "10px 12px",
    borderRadius: "6px",
    transition: "0.3s",
    fontSize: "14px",
  },

  active: {
    background: "#4f46e5",
    color: "#fff",
    fontWeight: "bold",
  },

  footer: {
    marginTop: "auto",
  },
};