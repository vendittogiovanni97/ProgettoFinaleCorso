/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordVisibility from "../customizations/PasswordVisibility";
import {
  Container,
  FormContainer,
  Form,
  Input,
  Button,
  ErrorMessage,
} from "../styled/RegistrationStyle";
import { AuthContext } from "../context/Auth.Provider";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confermaPassword: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);
  const [success, setSuccess] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confermaPassword) {
      setError("Le password non coincidono.");
      return;
    }

    try {
      const responseBody = await register(formData);
      setError("");
      console.log("Dati inviati:", responseBody);

      if (responseBody) {
        setSuccess(true);
        navigate("/login");
      } else {
        setError("Si è verificato un errore durante la registrazione.");
      }
    } catch (err) {
      setError("Si è verificato un errore durante la registrazione.");
      console.error(err);
    }
  };

  return (
    <Container
      style={{
        backgroundImage: "url(pics/image1.jpg)",
        backgroundSize: "cover",
      }}
    >
      <FormContainer onSubmit={handleSubmit}>
        <h1
          style={{
            textAlign: "center",
            color: "black",
            fontSize: "30px",
            padding: "5px",
            margin: "0, 0, 20px, 0",
            fontWeight: "bold",
          }}
        >
          DROCSID
        </h1>
        <h2
          style={{
            textAlign: "center",
            color: "black",
            fontSize: "20px",
            padding: "10px",
            fontWeight: "bold",
          }}
        >
          Registrati
        </h2>
        <Form>
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
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
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <PasswordVisibility onClick={togglePasswordVisibility} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              name="confermaPassword"
              placeholder="Conferma password"
              value={formData.confermaPassword}
              onChange={handleChange}
            />
            <PasswordVisibility onClick={toggleConfirmPasswordVisibility} />
          </div>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button type="submit">Registrati</Button>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default RegistrationForm;
