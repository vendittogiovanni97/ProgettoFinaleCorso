import { useState, FormEvent, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Box, FormControl } from "@mui/material";
import {
  StyledButton,
  StyledTextField,
  StyledFormLabel,
} from "../../../../styled/ResetPasswordStyled";
import PasswordContainer from "./PasswordContainer";

export default function ResetPasswordForm() {
  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (emailError || passwordError) return;

    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const handleLoginClick = () => {
    navigate("/Login");
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleConfirmPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const email = (document.getElementById("email") as HTMLInputElement)?.value;
    const password = (document.getElementById("password") as HTMLInputElement)?.value;
    const confirmPassword = (document.getElementById("confirmPassword") as HTMLInputElement)?.value;

    if (!email || !validateEmail(email)) {
      setEmailError(true);
      setEmailErrorMessage("Email non valida");
      return;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (password === confirmPassword) {
      handleLoginClick();
    } else {
      setPasswordError(true);
      setPasswordErrorMessage("Le password non corrispondono");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: "16px",
      }}
    >
      <FormControl>
        <StyledFormLabel htmlFor="email">Email</StyledFormLabel>
        <StyledTextField
          error={emailError}
          helperText={emailErrorMessage}
          id="email"
          type="email"
          name="email"
          placeholder="your@email.com"
          autoComplete="email"
          autoFocus
          required
          fullWidth
          variant="outlined"
        />
      </FormControl>
      <PasswordContainer
        showPassword={showPassword}
        toggleVisibility={togglePasswordVisibility}
        error={passwordError}
        errorMessage={passwordErrorMessage}
        name="password"
        placeholder="Password"
      />
      <PasswordContainer
        showPassword={showConfirmPassword}
        toggleVisibility={toggleConfirmPasswordVisibility}
        error={passwordError}
        errorMessage={passwordErrorMessage}
        name="confirmPassword"
        placeholder="Conferma password"
      />
      <StyledButton type="submit" fullWidth onClick={handleConfirmPassword}>
        Reset Password
      </StyledButton>
    </Box>
  );
}