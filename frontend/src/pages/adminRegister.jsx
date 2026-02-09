

import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import api from "../api";

function AdminRegister() {
  const Navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async e => {
    e.preventDefault();
    try {
      await api.post("/register", form);
    
    } catch (err) {
      setMsg(err.response.data.message);
    }
    Navigate("/admin/login");
  };
  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleRegister}>
        <h2>Admin Register</h2>

        <input name="username" placeholder="username" onChange={handleChange} required style={styles.input}/>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required style={styles.input}/>
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required style={styles.input}/>

        <button style={styles.button}>Register</button>
      </form>
    </div>
  );
}

const styles = {
  container: { display: "flex", height: "100vh", justifyContent: "center", alignItems: "center" },
  form: { background: "#fff", padding: 30, borderRadius: 10, width: 300, boxShadow: "0 0 10px #ccc" },
  input: { width: "100%", padding: 10, margin: "10px 0" },
  button: { width: "100%", padding: 10, background: "#2196F3", color: "#fff", border: "none" }
};

export default AdminRegister;