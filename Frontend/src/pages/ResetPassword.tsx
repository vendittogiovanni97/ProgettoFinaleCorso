import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import PasswordVisibility from "../customizations/PasswordVisibility";
import {
  ContainerResetPassword,
  StyledButton,
  StyledTextField,
  Card,
  StyledFormLabel,
} from "../styled/ResetPasswordStyled";

const ResetPassword: React.FC = () => {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (emailError || passwordError) {
      
      return;
    }

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
    const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleConfirmPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    const email = (document.getElementById("email") as HTMLInputElement)?.value;
    const password = (document.getElementById("password") as HTMLInputElement)
      ?.value;
    const confirmPassword = (
      document.getElementById("confirmPassword") as HTMLInputElement
    )?.value;

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
    <ContainerResetPassword>
      <Card
        variant="outlined"
        sx={{
          backgroundColor: "black",
          background: "black",
          opacity: 1,
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{
            width: "100%",
            color: "#ffd700",
            fontWeight: "bold",
            fontSize: "clamp(1.5rem, 10vw, 2rem)",
            textAlign: "center",
            mb: 1,
          }}
        >
          DROCSID
        </Typography>
        <Typography
          component="h2"
          variant="h5"
          sx={{
            width: "100%",
            color: "#ffd700",
            fontSize: "clamp(1.3rem, 8vw, 1.7rem)",
            mb: 3,
            textAlign: "center",
          }}
        >
          Reset Password
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          <FormControl>
            <StyledFormLabel sx={{ color: "#ffd700" }} htmlFor="email">
              Email
            </StyledFormLabel>
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
            <FormControl>
            <StyledFormLabel sx={{ color: "#ffd700" }} htmlFor="password">
              Password
            </StyledFormLabel>
            <StyledTextField
              error={passwordError}
              helperText={passwordErrorMessage}
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="password"
              id="password"
              autoComplete="new-password"
              required
              fullWidth
              variant="outlined"
            />
            <PasswordVisibility onClick={togglePasswordVisibility} />
            <StyledFormLabel
              htmlFor="confirmPassword"
              sx={{ mt: 2, color: "#ffd700" }}
            >
              Conferma Password
            </StyledFormLabel>
            <StyledTextField
              error={passwordError}
              helperText={passwordErrorMessage}
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Conferma password"
              id="confirmPassword"
              autoComplete="new-password"
              required
              fullWidth
              variant="outlined"
            />
            <PasswordVisibility onClick={toggleConfirmPasswordVisibility} />
            </FormControl>
          <StyledButton
            type="submit"
            fullWidth
            onClick={handleConfirmPassword}
            sx={{
              mt: 2,
              backgroundColor: "#ffd700",
              color: "#000000 !important",
            }}
          >
            Reset Password
          </StyledButton>
        </Box>
      </Card>
    </ContainerResetPassword>
  );
};

export default ResetPassword;
