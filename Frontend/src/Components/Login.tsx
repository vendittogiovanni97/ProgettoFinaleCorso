import React, { useState } from 'react';
import styled from 'styled-components';
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { Form, Button as Button2 } from "react-bootstrap";
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import './Login.css';

// Interfaccia per i dati del form
interface FormData {
  nome: string;
  cognome: string;
  email: string;
  dataDiNascita: string;
  password: string;
  confermaPassword: string;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom, black, #333333);
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  margin-top: 1rem;
  border-radius: 5px;
  border: none;
  background-color: #000000;
  color: #ffcc00;
  font-weight: bold;
  cursor: pointer;
  font-size: 1rem;`;

const FormContainer = styled.div`
  background-color: #ffd700;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  width: 300px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
`;
const PasswordContainer = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

const PasswordInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const PasswordButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  background-color: black;
  border: none;
  border-radius: 0 5px 5px 0;
  color: white;
  padding: 0 10px;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const RecoverPasswordLink = styled.a`
  color: #0066cc;
  text-decoration: none;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

const RegisterLink = styled.a`
  color: #0066cc;
  text-decoration: none;
  cursor: pointer;
  margin-left: 5px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    cognome: '',
    email: '',
    dataDiNascita: '',
    password: '',
    confermaPassword: '',
  });

  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  // Funzione per validare la password
  const validatePassword = (password: string): boolean => {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
    return regex.test(password);
  };

  // Gestione del submit del form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // Validazione della password
    if (!validatePassword(formData.password)) {
      setError('La password deve contenere almeno 6 caratteri, un numero e un carattere speciale.');
      return;
    }

    // Verifica che la password e la conferma password siano uguali
    if (formData.password !== formData.confermaPassword) {
      setError('Le password non coincidono.');
      return;
    }

    setError('');
    console.log('Dati inviati:', formData);
    // Qui puoi aggiungere la logica per la registrazione (ad esempio, una chiamata API)
  };

  // Mostra/nascondi password
  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  // Gestione dei cambiamenti nei campi del form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Gestione del login con Google
  const handleGoogleLogin = (): void => {
    console.log('Login con Google effettuato');
  };

  // Gestione del login con Facebook
  const handleFacebookLogin = (): void => {
    console.log('Login con Facebook effettuato');
  };

  // Reindirizza alla pagina di registrazione
  const handleRegistrationClick = (): void => {
    navigate('/Registration');
  };

  const handleResetPasswordClick = (): void => {
    navigate('/ResetPassword');
  };

  // Reindirizza alla Dashboard
  const handleDashboardClick = (): void => {
    if (formData.email === 'eleonoratornesi@gmail.com' && formData.password === 'password1999!') {
      navigate('/Dashboard');
    } else {
      alert('Credenziali non valide');
    }
  };

  return (
    <Container style={{ backgroundImage: 'url(/pics/image1.jpg)', backgroundSize: 'cover'}}>
      <h1 style={{ position: 'fixed', top: '300px', left: '15%', transform: 'translateX(-50%)', margin: '20px 0', color: '#ffd700' }}>
        WELCOME TO  </h1>
        <h4>DROCSID</h4>
     
      
      <FormContainer style={{position: 'fixed'}}>
        <Typography
          component="h2"
          variant="h5"
          sx={{
            width: '100%',
            color: 'black',
            fontSize: 'clamp(1.9rem, 11vw, 2.7rem)',
            mb: 3,
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          Login
        </Typography>

        <StyledForm onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <PasswordContainer>
            <PasswordInput
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <PasswordButton type="button" onClick={togglePasswordVisibility}>
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </PasswordButton>
          </PasswordContainer>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Form.Group controlId="formRememberMe">
            <Form.Check
              type="checkbox"
              label="Ricordami"
              checked={rememberMe}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRememberMe(e.target.checked)}
              style={{color: 'black', fontWeight: 'bold'}}
            />
          </Form.Group>
          <LoginButton type="button" onClick={handleDashboardClick}>
            Accedi
          </LoginButton>
        </StyledForm>
        <div className="text-center mt-3">
          <p style={{color: 'black', fontWeight: 'bold'}}>Hai dimenticato la password?</p>
          <RecoverPasswordLink onClick={handleResetPasswordClick} style={{textDecoration: 'none', color: 'black', fontWeight: 'bold'}}>
            Recupera Password
          </RecoverPasswordLink>
        </div>
        <div className="text-center mt-3">
          <Button2 variant="outline-danger" onClick={handleGoogleLogin} className="social-button google-button">
            <FontAwesomeIcon icon={faGoogle} /> Accedi con Google
          </Button2>
          <Button2 variant="outline-primary" onClick={handleFacebookLogin} className="social-button facebook-button mt-2">
            <FontAwesomeIcon icon={faFacebook} /> Accedi con Facebook
          </Button2>
        </div>
        <div className="text-center mt-3">
          <p style= {{color: 'black', fontWeight: 'bold'}}>
            Non hai un account?
            <RegisterLink onClick={handleRegistrationClick} style={{textDecoration: 'none', color: 'black', fontWeight: 'bold'}}>
              Registrati
            </RegisterLink>
          </p>
        </div>
      </FormContainer>
    </Container>
  );
};

export default Login;