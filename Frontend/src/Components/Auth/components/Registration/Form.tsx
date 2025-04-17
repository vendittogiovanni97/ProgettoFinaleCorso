import { useContext, useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import PasswordVisibility from "../../../../customizations/PasswordVisibility";
import {
  FormContainer,
  Form,
  Input,
  ErrorMessage,
  PasswordContainer,
  PasswordInput,
} from "../../../../styled/RegistrationStyle";
import { AuthContext } from "../../../../context/Auth.Provider";
import { FormData } from "../../../../types/components/typesRegistration";
import RegistrationButton from "./RegistrationButton";
import HeaderRegistration from "./Header";

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
  const { register } = useContext(AuthContext);
  const [success, setSuccess] = useState<boolean>(false);

  const togglePasswordVisibility = (): void => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleConfirmPasswordVisibility = (): void => {
    setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
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
        <PasswordContainer style={{ position: "relative", marginBottom: "1rem" }}>
          <PasswordInput
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ paddingRight: "40px" }}
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

        <PasswordContainer style={{ position: "relative", marginBottom: "1rem" }}>
          <PasswordInput
            type={showConfirmPassword ? "text" : "password"}
            name="confermaPassword"
            placeholder="Conferma password"
            value={formData.confermaPassword}
            onChange={handleChange}
            required
            style={{ paddingRight: "40px" }}
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
        <RegistrationButton />
      </Form>
    </FormContainer>
  );
}