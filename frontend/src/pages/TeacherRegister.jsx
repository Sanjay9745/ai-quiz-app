import { useState } from "react";
import { registerTeacher } from "../api/teacher";

export default function TeacherRegister() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // Handle registration logic here
    const userData = { username: form.username, email: form.email, password: form.password };
        registerTeacher(userData)
          .then((data) => {
            console.log("Registration successful:", data);               
          
            // Redirect to login or dashboard page
            window.location.href = "/teacher/login";
          })
          .catch((error) => {
            setError(error.message);
            console.error("Registration failed:", error);
          });
  /*   try {
      const data = await registerTeacher(form);
      console.log("Registration successful:", data);
      // Redirect to login or dashboard page
      window.location.href = "/login";
    } catch (err) {
      setError(err.message);
      console.log("Registration failed:", err);
    } */
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-slate-800 p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold text-white mb-4">Teacher Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg"
          >
            Register
          </button>
          {error && <p className="text-red-400 text-sm">{error}</p>}
        </form>
        <p className="mt-4 text-sm text-slate-400 text-center">
          Already registered?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
