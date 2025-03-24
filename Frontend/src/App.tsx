import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './App/Dashboard';
import Login from './Components/Login';
import RegistrationForm from './Components/Registration';
import ResetPassword from './Components/ResetPassword';
import ProfilePage from './Components/ProfilePage'; // Importa il componente ProfilePage


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/Login" element={<Login />} />
                <Route path="/resetpassword" element={<ResetPassword />} />
                <Route path="/registration" element={<RegistrationForm />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile/:userId" element={<ProfilePage />} /> {/* Nuova rotta per il profilo */}
                <Route path="*" element={<Login />} />
            </Routes>
        </Router>
    )
}

export default App;

