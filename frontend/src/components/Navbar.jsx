import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav style={styles.nav}>
      {/* Logo */}
      <h2 style={styles.logo}>TaskFlow</h2>

      {/* Links */}
      <div style={styles.links}>
        <Link
          to="/dashboard"
          style={{
            ...styles.link,
            ...(location.pathname === "/dashboard" && styles.active),
          }}
        >
          Dashboard
        </Link>

        <Link
          to="/projects"
          style={{
            ...styles.link,
            ...(location.pathname === "/projects" && styles.active),
          }}
        >
          Projects
        </Link>

        <Link
          to="/tasks"
          style={{
            ...styles.link,
            ...(location.pathname === "/tasks" && styles.active),
          }}
        >
          Tasks
        </Link>
      </div>

      {/* Logout */}
      <button onClick={logout} style={styles.logout}>
        Logout
      </button>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 30px",
    background: "linear-gradient(90deg, #4f46e5, #7c3aed)",
    color: "#fff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
  },

  logo: {
    margin: 0,
    fontWeight: "bold",
    letterSpacing: "1px",
  },

  links: {
    display: "flex",
    gap: "25px",
  },

  link: {
    color: "#e5e7eb",
    textDecoration: "none",
    fontSize: "15px",
    transition: "0.3s",
  },

  active: {
    color: "#fff",
    fontWeight: "bold",
    borderBottom: "2px solid #fff",
    paddingBottom: "2px",
  },

  logout: {
    background: "#111827",
    border: "none",
    color: "#fff",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "0.3s",
  },
};