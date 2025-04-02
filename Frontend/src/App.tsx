import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import RegistrationForm from "./pages/Registration";
import ResetPassword from "./pages/ResetPassword";
import ProfilePage from "./pages/ProfilePage";
import NotFound404Paged from "./pages/notFound";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profilepage" element={<ProfilePage />} />
        <Route
          path="/profile/user/:id"
          element={<Profile 
            contact={{
              id: 1,
              name: "Anil",
              status: "active",
              avatar: "https://example.com/avatar.jpg",
              lastSeen: new Date().toISOString(),
              isOnline: true,
              phone: "123-456-7890"
            }}
          />}
        />
        <Route path="/notfound" element={<NotFound404Paged />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;