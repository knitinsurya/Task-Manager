import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Member",
    adminId: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const nav = useNavigate();

 const signup = async () => {
  try {
    setError("");

    if (!data.name || !data.email || !data.password) {
      return setError("All fields are required");
    }

    if (data.role === "Admin" && !data.adminId) {
      return setError("Admin ID is required for Admin signup");
    }

    setLoading(true);

    await API.post("/auth/signup", data);

    nav("/");
  } catch (err) {
    console.log("ERROR:", err.response?.data);

    setError(
      err.response?.data?.message ||
      err.response?.data?.error ||
      "Signup failed"
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account 🚀</h2>
        <p style={styles.subtitle}>Join the Task Manager</p>

        {error && <p style={styles.error}>{error}</p>}

        <input
          placeholder="Full Name"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          style={styles.input}
        />

        <input
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          style={styles.input}
        />

        <select
          value={data.role}
          onChange={(e) => setData({ ...data, role: e.target.value })}
          style={styles.input}
        >
          <option value="Member">Member</option>
          <option value="Admin">Admin</option>
        </select>

        {/* 🔥 Conditional field */}
        {data.role === "Admin" && (
          <input
            placeholder="Enter Admin ID"
            value={data.adminId}
            onChange={(e) =>
              setData({ ...data, adminId: e.target.value })
            }
            style={styles.input}
          />
        )}

        <button onClick={signup} style={styles.button} disabled={loading}>
          {loading ? "Creating..." : "Signup"}
        </button>

        <p style={styles.footer}>
          Already have an account?{" "}
          <Link to="/" style={styles.link}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}


const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #4f46e5, #9333ea)",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    width: "320px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  title: {
    margin: 0,
    textAlign: "center",
  },
  subtitle: {
    margin: 0,
    textAlign: "center",
    color: "#666",
    fontSize: "14px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
  },
  button: {
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    background: "#4f46e5",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    fontSize: "13px",
    textAlign: "center",
  },
  footer: {
    textAlign: "center",
    fontSize: "14px",
  },
  link: {
    color: "#4f46e5",
    textDecoration: "none",
    fontWeight: "bold",
  },
};