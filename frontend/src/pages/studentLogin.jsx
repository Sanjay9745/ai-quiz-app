import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function StudentLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const student = JSON.parse(localStorage.getItem("student"));

    if (!student) {
      setError("No student registered");
      return;
    }

    if (email === student.email && password === student.password) {
      navigate("/student/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleLogin}>
        <h2>Student Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button style={styles.button}>Login</button>

        <p>
          New student? <Link to="/student/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: { display: "flex", height: "100vh", justifyContent: "center", alignItems: "center" },
  form: { padding: 30, width: 300, background: "#fff", borderRadius: 8 },
  input: { width: "100%", padding: 10, marginBottom: 10 },
  button: { width: "100%", padding: 10 }
};

export default StudentLogin;



