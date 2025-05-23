import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormContainer,
  Form,
  Input,
  ErrorMessage,
} from "../../../../styled/RegistrationStyle";
import { FormData } from "../../../../types/components/typesRegistration";
import RegistrationButton from "./RegistrationButton";
import HeaderRegistration from "./Header";
import PasswordContainer from "./PasswordContainer";
import authService from "../../../../services/components/authService";

export default function RegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confermaPassword: "",
  });

  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const navigate = useNavigate();

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
      const response = await authService.register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      setError("");
      console.log("Registrazione completata:", response);

      if (response) {
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
    <FormContainer onSubmit={handleSubmit}>
      <HeaderRegistration />
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
          showPassword={showPassword}
          toggleVisibility={togglePasswordVisibility}
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <PasswordContainer
          showPassword={showConfirmPassword}
          toggleVisibility={toggleConfirmPasswordVisibility}
          name="confermaPassword"
          placeholder="Conferma password"
          value={formData.confermaPassword}
          onChange={handleChange}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <RegistrationButton />
      </Form>
    </FormContainer>
  );
}