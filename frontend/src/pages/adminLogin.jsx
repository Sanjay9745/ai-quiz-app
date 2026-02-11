


import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async(e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    

      try {
         const response = await api.post("/login", { email, password });
         const { token } = response.data;
         if (!token) {
           setError("Invalid login response");
           return;
         }
      


         localStorage.setItem("adminToken", token);

          alert("Login successful");
         
         navigate("/admin/dashboard");
      } catch (error) {
        setError(error.response.data.message);
        return; 
      }
    
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleLogin}>
        <h2>Admin Login</h2>

        {error && <p style={{color:"red"}}>{error}</p>}

        <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} required style={styles.input}/>
        <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} required style={styles.input}/>

        <button style={styles.button}>Login</button>

        <p>New admin? <Link to="/admin/register">Register here</Link></p>
      </form>
    </div>
  );
}

const styles = {
  container: { display: "flex", height: "100vh", justifyContent: "center", alignItems: "center" },
  form: { background: "#fff", padding: 30, borderRadius: 10, width: 300, boxShadow: "0 0 10px #ccc" },
  input: { width: "100%", padding: 10, margin: "10px 0" },
  button: { width: "100%", padding: 10, background: "#4CAF50", color: "#fff", border: "none" }
};

export default AdminLogin;