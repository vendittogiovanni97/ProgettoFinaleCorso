import React, { useState } from 'react';
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import {Container, FormContainer, Form, Input, Button, ErrorMessage } from "./RegistrationStyle"

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    email: '',
    dataDiNascita: '',
    password: '',
    confermaPassword: '',
  });

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Funzione per validare la password
  const validatePassword = (password: string) => {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
    return regex.test(password);
  };

  // Gestione del submit del form
  const handleSubmit = (e: React.FormEvent) => {
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

  const handleHomepageonClick = () => {
    if (formData.nome === 'Eleonora' && formData.cognome === 'Baroni' && formData.email === 'eleonoratornesi@gmail.com' && formData.dataDiNascita === '1999-12-09' && formData.password === 'password1999!' && formData.confermaPassword === 'password1999!') {
      navigate('/dashboard');
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
};

  // Gestione dei cambiamenti nei campi del form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Container style={{backgroundImage: 'url(pics/image1.jpg', backgroundSize: 'cover'}}>
      <h1 style={{ position: 'absolute', top: '50px', left: '50%', transform: 'translateX(-50%)', margin: '20px 0', color: '#ffd700' }}>
        DROCSID
      </h1>
      <FormContainer >
      
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="nome"
            placeholder="Nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="cognome"
            placeholder="Cognome"
            value={formData.cognome}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <div style={{color: 'black', fontWeight: 'bold'}}>Data di nascita:</div>
          <Input
            type="date"
            name="dataDiNascita"
            placeholder="Data di nascita"
            value={formData.dataDiNascita}
            onChange={handleChange}
            required
          />
          <Form style={{ display: 'flex', alignItems:'initial' , gap: '10px' }}>
            <div>
              <Input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                style={{ flex: 1, padding: '8px', border:'1px solid #ccc', borderRadius: '5px', width: '82%' }}
              />
              <Button 
                type="button" 
                onClick={togglePasswordVisibility}
                style={{ 
                  padding: '8px 12px', 
                  backgroundColor: 'black', 
                  border: '1px solid #ccc', 
                  borderRadius: '4px', 
                  cursor: 'pointer' 
                }}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </Button>
            </div>
          </Form>
          <Form style={{ display: 'flex', alignItems:'initial' , gap: '10px' }}>
            <div>
              <Input
                type={showPassword ? 'text' : 'password'}
                name="confermaPassword"
                placeholder="Conferma password"
                value={formData.confermaPassword}
                onChange={handleChange}
                required
                style={{ flex: 1, padding: '8px', border:'1px solid #ccc', borderRadius: '5px', width: '82%' }}
              />
              <Button 
                type="button" 
                onClick={togglePasswordVisibility}
                style={{ 
                  padding: '8px 12px', 
                  backgroundColor: 'black', 
                  border: '1px solid #ccc', 
                  borderRadius: '4px', 
                  cursor: 'pointer' 
                }}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </Button>
            </div>
          </Form>
          
          {error && <ErrorMessage>{error}</ErrorMessage>} {/* Mostra l'errore se presente */}
          <Button type="submit" onClick={handleHomepageonClick}>Registrati</Button>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default RegistrationForm;