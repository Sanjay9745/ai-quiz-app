import { BrowserRouter, Routes, Route } from "react-router-dom";

import StudentLogin from "./pages/studentLogin";
import StudentRegister from "./pages/studentRegister";
import StudentDashboard from "./pages/studentDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentLogin />} />
        <Route path="/student/register" element={<StudentRegister />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

