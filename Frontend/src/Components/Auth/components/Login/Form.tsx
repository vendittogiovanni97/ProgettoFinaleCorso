import { Input } from "@mui/material";
import PasswordVisibility from "../../../../customizations/PasswordVisibility";
import {
  StyledForm,
  PasswordContainer,
  PasswordInput,
  ErrorMessage,
} from "../../../../styled/LoginStyled";
import { Form } from "react-bootstrap";
import Button from "./LoginButton";
import { useContext, useState } from "react";
import { AuthContext } from "../../../../context/Auth.Provider";
import { FormData } from "../../../../types/components/UserLogged.type";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

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

  // Gestione dei cambiamenti nei campi del form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <StyledForm onSubmit={handleSubmit}>
      <Input
        type="email"
        name="email"
        placeholder="E-mail"
        value={formData.email}
        onChange={handleChange}
        required
        style={{
          backgroundColor: "white",
        }}
      />
      <PasswordContainer style={{ position: "relative" }}>
        <PasswordInput
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{
            paddingRight: "40px", // Lascia spazio per l'icona
            width: "100%",
            backgroundColor: "white",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "1px",
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer",
          }}
        >
          <PasswordVisibility
            onClick={togglePasswordVisibility}
            visible={showPassword}
          />
        </div>
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

      <Button />
    </StyledForm>
  );
}
