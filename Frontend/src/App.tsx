import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import RegistrationForm from "./pages/Registration";
import ResetPassword from "./pages/ResetPassword";
import ProfilePage from "./pages/ProfilePage"; // Importa il componente ProfilePage
import NotFound404Paged from "./pages/notFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />{" "}
        {/* Nuova rotta per il profilo */}
        <Route path="/notfound" element={<NotFound404Paged />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
