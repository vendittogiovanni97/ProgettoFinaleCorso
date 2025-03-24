/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);
  const [success, setSuccess] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
        backgroundImage: "url(pics/image1.jpg",
        backgroundSize: "cover",
      }}
    >
      <h1
        style={{
          position: "absolute",
          top: "50px",
          left: "50%",
          transform: "translateX(-50%)",
          margin: "20px 0",
          color: "#ffd700",
        }}
      >
        DROCSID
      </h1>
      <FormContainer onSubmit={handleSubmit}>
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
              required
              style={{
                flex: 1,
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                width: "82%",
              }}
            />
            <Button
              type="button"
              onClick={togglePasswordVisibility}
              style={{
                padding: "8px 12px",
                backgroundColor: "black",
                border: "1px solid #ccc",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </Button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Input
              type={showPassword ? "text" : "password"}
              name="confermaPassword"
              placeholder="Conferma password"
              value={formData.confermaPassword}
              onChange={handleChange}
              required
              style={{
                flex: 1,
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                width: "82%",
              }}
            />
            <Button
              type="button"
              onClick={togglePasswordVisibility}
              style={{
                padding: "8px 12px",
                backgroundColor: "black",
                border: "1px solid #ccc",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </Button>
          </div>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button type="submit">Registrati</Button>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default RegistrationForm;
