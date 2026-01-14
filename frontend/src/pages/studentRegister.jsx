import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    localStorage.setItem("student", JSON.stringify(form));
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleRegister}>
        <h2>Student Register</h2>

        <input
          name="name"
          placeholder="Name"
          required
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          onChange={handleChange}
          style={styles.input}
        />

        <button style={styles.button}>Register</button>
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

export default StudentRegister;
