import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import RegistrationForm from "./pages/Registration";
import ResetPassword from "./pages/ResetPassword";
import ProfilePage from "./pages/ProfilePage";
import NotFound404Paged from "./pages/notFound";
import Profile from "./pages/Profile";
import ThemeProvider from "../src/customizations/Theme"; // Importa il ThemeProvider
import Layout from "../src/customizations/Layout"; // Importeremo un nuovo componente Layout
import { AppWrapper } from "../src/styled/DashboardStyled"; // Assicurati che il percorso sia corretto
import PaginaImpostazioni from "./pages/Settings";

function App() {
  return (
    <ThemeProvider>
      <AppWrapper>
        <Router>
          <Routes>
            {/* Pagine senza layout (login, registrazione, ecc.) */}
            <Route path="/login" element={<Login />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/registration" element={<RegistrationForm />} />

            {/* Pagine con layout (dashboard, profilo, ecc.) */}
            <Route
              path="/dashboard"
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              }
            />
            <Route
              path="/profilepage"
              element={
                <Layout>
                  <ProfilePage />
                </Layout>
              }
            />
            <Route
              path="/settings"
              element={
                <Layout>
                  <PaginaImpostazioni />
                </Layout>
              }
            />
            <Route
              path="/profile/user/:id"
              element={
                <Layout>
                  <Profile
                    contact={{
                      id: 1,
                      name: "Anil",
                      status: "active",
                      avatar: "https://example.com/avatar.jpg",
                      lastSeen: new Date().toISOString(),
                      isOnline: true,
                      phone: "123-456-7890",
                    }}
                  />
                </Layout>
              }
            />

            {/* Pagina di errore */}
            <Route path="/notfound" element={<NotFound404Paged />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </Router>
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;
