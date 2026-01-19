import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/adminLogin";
import AdminRegister from "./pages/adminRegister";
import AdminDashboard from "./pages/adminDashboard";
import TeacherLogin from "./pages/TeacherLogin";
import TeacherRegister from "./pages/TeacherRegister";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/teacher/login" element={<TeacherLogin />} />
        <Route path="/teacher/register" element={<TeacherRegister />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;