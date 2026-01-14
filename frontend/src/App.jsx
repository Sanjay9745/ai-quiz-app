import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/adminLogin";
import AdminRegister from "./pages/adminRegister";
import AdminDashboard from "./pages/adminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/register" element={<AdminRegister />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;