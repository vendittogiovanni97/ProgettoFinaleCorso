/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { Form, Button as Button2 } from "react-bootstrap";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import "../css/Login.css";
import { AuthContext } from "../context/Auth.Provider";
import { Link } from "react-router-dom";
import { FormData } from "../types/components/UserLogged.type";
import {
  Container,
  ErrorMessage,
  FormContainer,
  Input,
  LoginButton,
  PasswordButton,
  PasswordContainer,
  PasswordInput,
  StyledForm,
} from "../styled/LoginStyled";



const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const { login } = useContext(AuthContext);
  const [isOvered, setIsOvered] = useState(false);
  // Gestione del submit del form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dataLogin = {
      email: formData.email, // Correggi qui
      password: formData.password, // E qui
    };
    const response = await login(dataLogin);
    if (response) {
      console.log("Login Successful");
      navigate("/dashboard");
    } else {
      alert("Credenziali non valide");
    }
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
    console.log("Login con Google effettuato");
  };

  // Gestione del login con Facebook
  const handleFacebookLogin = (): void => {
    console.log("Login con Facebook effettuato");
  };

  return (
    <Container
      style={{
        backgroundImage: "url(/pics/image1.jpg)",
        backgroundSize: "cover",
      }}
    >
      <h1
        style={{
          position: "fixed",
          top: "300px",
          left: "15%",
          transform: "translateX(-50%)",
          margin: "20px 0",
          color: "#ffd700",
        }}
      >
        WELCOME TO DROCSID
      </h1>
      <FormContainer style={{ position: "fixed" }}>
        <Typography
          component="h2"
          variant="h5"
          sx={{
            width: "100%",
            color: "black",
            fontSize: "clamp(1.9rem, 11vw, 2.7rem)",
            mb: 3,
            textAlign: "center",
            fontWeight: "bold",
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
              type={showPassword ? "text" : "password"}
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setRememberMe(e.target.checked)
              }
              style={{ color: "black", fontWeight: "bold" }}
            />
          </Form.Group>
          
          <LoginButton style= {{background: isOvered ? '#ffb700' : 'black', color: isOvered ? 'black': '#ffd700'}} type="submit" 
          onMouseEnter={() => setIsOvered(true)}
          onMouseLeave={() => setIsOvered(false)}>
            
          Accedi</LoginButton>
          
        </StyledForm>
        <div className="text-center mt-3">
          <p style={{ color: "black", fontWeight: "bold" }}>
            Hai dimenticato la password?
          </p>
          <Link
            to={"/resetpassword"}
            style={{
              textDecoration: "none",
              color: "black",
              fontWeight: "bold",
            }}>
            Recupera Password
          </Link>
        </div>
        <div className="text-center mt-3">
          <Button2
            variant="outline-danger"
            onClick={handleGoogleLogin}
            className="social-button google-button"
          >
            <FontAwesomeIcon icon={faGoogle} /> Accedi con Google
          </Button2>
          <Button2
            variant="outline-primary"
            onClick={handleFacebookLogin}
            className="social-button facebook-button mt-2"
          >
            <FontAwesomeIcon icon={faFacebook} /> Accedi con Facebook
          </Button2>
        </div>
        <div className="text-center mt-3">
          <p style={{ color: "black", fontWeight: "bold" }}>
            Non hai un account?
            <Link
              to={"/registration"}
              style={{
                textDecoration: "none",
                color: "black",
                fontWeight: "bold",
              }}
            >
              Registrati
            </Link>
          </p>
        </div>
      </FormContainer>
    </Container>
  );
};

export default Login;
