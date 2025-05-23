import PasswordVisibility from "../../../../customizations/PasswordVisibility";
import {
  StyledForm,
  PasswordContainer,
  PasswordInput,
  ErrorMessage,
  Input,
  PasswordVisibilityWrapper
} from "../../../../styled/LoginStyled";
import Button from "./LoginButton";
import { useContext, useState } from "react";
import { AuthContext } from "../../../../context/Auth.Provider";
import { FormData } from "../../../../types/components/UserLogged.type";
import { useNavigate } from "react-router-dom";
import RememberMe from "./RememberMe";

export default function LoginForm() {
  const { login } = useContext(AuthContext);
  const [error, setError] = useState<string>(""); // Cambiato qui
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
    setError(""); // Reset eventuali errori precedenti
    try {
      const response = await login(dataLogin);
      if (response) {
        console.log("Login Successful");
        navigate("/dashboard");
      } else {
        setError("Credenziali non valide o errore di connessione.");
      }
    } catch {
      setError("Errore di rete o del server.");
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
            paddingRight: "40px",
            width: "100%",
            backgroundColor: "white",
          }}
        />
        <PasswordVisibilityWrapper>
          <PasswordVisibility
            onClick={togglePasswordVisibility}
            visible={showPassword}
          />
        </PasswordVisibilityWrapper>
      </PasswordContainer>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      <RememberMe />

      <Button />
    </StyledForm>
  );
}
