import { Input } from "@mui/material";
import PasswordVisibility from "../../../../customizations/PasswordVisibility";
import {
  StyledForm,
  PasswordContainer,
  PasswordInput,
  ErrorMessage,
} from "../../../../styled/LoginStyled";
import Button from "./LoginButton";
import { useContext, useState } from "react";
import { AuthContext } from "../../../../context/Auth.Provider";
import { FormData } from "../../../../types/components/UserLogged.type";
import { useNavigate } from "react-router-dom";
import RememberMe from "./RememberMe";

export default function LoginForm() {
  const { login } = useContext(AuthContext);
  const [error] = useState<string>("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dataLogin = {
      email: formData.email,
      password: formData.password,
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
      <RememberMe />

      <Button />
    </StyledForm>
  );
}
