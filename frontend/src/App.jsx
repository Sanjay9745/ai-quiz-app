import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TeacherLogin from "./pages/TeacherLogin";
import TeacherRegister from "./pages/TeacherRegister";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/teacher/login" element={<TeacherLogin />} />
        <Route path="/teacher/register" element={<TeacherRegister />} />
      </Routes>
    </Router>
  );
}

export default App;