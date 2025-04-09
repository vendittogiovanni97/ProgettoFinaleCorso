import { useState, FormEvent, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Box, FormControl } from "@mui/material";
import PasswordVisibility from "../customizations/PasswordVisibility";
import {
  ContainerResetPassword,
  StyledButton,
  StyledTextField,
  FormContainer,
  StyledFormLabel,
  TitleTypography,
  SubtitleTypography,
} from "../styled/ResetPasswordStyled";

const ResetPassword = () => {
  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
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
      <FormContainer>
        <TitleTypography variant="h4">DROCSID</TitleTypography>
        <SubtitleTypography variant="h5">Reset Password</SubtitleTypography>
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
          <FormControl>
            <StyledFormLabel htmlFor="password">Password</StyledFormLabel>
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
              InputProps={{
                endAdornment: (
                  <PasswordVisibility onClick={togglePasswordVisibility} />
                ),
              }}
            />
            <StyledFormLabel htmlFor="confirmPassword" sx={{ mt: 2 }}>
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
              InputProps={{
                endAdornment: (
                  <PasswordVisibility
                    onClick={toggleConfirmPasswordVisibility}
                  />
                ),
              }}
            />
          </FormControl>
          <StyledButton type="submit" fullWidth onClick={handleConfirmPassword}>
            Reset Password
          </StyledButton>
        </Box>
      </FormContainer>
    </ContainerResetPassword>
  );
};

export default ResetPassword;
