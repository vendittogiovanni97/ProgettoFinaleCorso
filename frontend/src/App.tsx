import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { LoginComponents } from './components/login/login.components'
import { RegisterComponents } from './components/register/register.componens'

function App() {
  return (
    <>
    <BrowserRouter> 
    <Routes>
          <Route path="/login" element={<LoginComponents />} />
          <Route path="/register" element={<RegisterComponents />} />
          {/* Reindirizza alla pagina di login se la route non è specificata */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          {/* Altre route della tua applicazione... */}
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
