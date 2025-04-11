/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import PasswordVisibility from "../customizations/PasswordVisibility";
import {
  Container,
  FormContainer,
  Form,
  Input,
  Button,
  ErrorMessage,
  PasswordContainer,
  PasswordInput,
} from "../styled/RegistrationStyle";
import { AuthContext } from "../context/Auth.Provider";
import { FormData } from "../types/components/typesRegistration";

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confermaPassword: "",
  });

  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);
  const [success, setSuccess] = useState<boolean>(false);

  const togglePasswordVisibility = (): void => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleConfirmPasswordVisibility = (): void => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
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
          Registration
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
          <PasswordContainer
            style={{ position: "relative", marginBottom: "1rem" }}
          >
            <PasswordInput
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ paddingRight: "40px" }} // Spazio per l'icona
            />
            <div
              style={{
                position: "absolute",
                right: "0.2px",
                top: "48%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                left: "85%",
              }}
            >
              <PasswordVisibility
                visible={showPassword}
                onClick={togglePasswordVisibility}
              />
            </div>
          </PasswordContainer>

          {/* Campo Conferma Password */}
          <PasswordContainer
            style={{ position: "relative", marginBottom: "1rem" }}
          >
            <PasswordInput
              type={showConfirmPassword ? "text" : "password"}
              name="confermaPassword"
              placeholder="Conferma password"
              value={formData.confermaPassword}
              onChange={handleChange}
              required
              style={{ paddingRight: "40px" }} // Spazio per l'icona
            />
            <div
              style={{
                position: "absolute",
                right: "0.3px",
                top: "48%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                left: "85%",
              }}
            >
              <PasswordVisibility
                visible={showConfirmPassword}
                onClick={toggleConfirmPasswordVisibility}
              />
            </div>
          </PasswordContainer>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button type="submit">Registrati</Button>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default RegistrationForm;
