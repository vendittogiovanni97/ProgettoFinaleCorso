import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const Card = styled(MuiCard)(() => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: "32px",
  gap: "16px",
  margin: "auto",
  maxWidth: "450px",
  backgroundColor: "#000000 !important",
  boxShadow:
    "0px 5px 15px 0px hsla(220, 30%, 5%, 0.5), 0px 15px 35px -5px hsla(220, 25%, 10%, 0.08)",
  borderRadius: "8px",
  border: "1px solid #2c2c2c",
}));

const ContainerResetPassword = styled(Stack)(() => ({
  height: "100vh",
  minHeight: "100%",
  padding: "16px",
  "@media (min-width: 600px)": {
    padding: "32px",
  },
  backgroundImage: "url(/pics/image1.jpg)",
}));

const StyledButton = styled(Button)(() => ({
  backgroundColor: "#ffcc00",
  color: "#000000 !important",
  fontWeight: "bold",
  "& .MuiButton-label": {
    color: "#000000 !important",
  },
  "&.MuiButton-contained": {
    color: "#000000 !important",
  },
  "&:hover": {
    backgroundColor: "#e6b800",
    color: "#000000 !important",
  },
}));

const StyledTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#2c2c2c",
    "& fieldset": {
      borderColor: "#444444",
    },
    "&:hover fieldset": {
      borderColor: "#666666",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#ffa500",
    },
  },
  "& .MuiInputBase-input": {
    color: "#ffffff",
  },
  "& .MuiFormHelperText-root": {
    color: "#ffa500",
  },
}));

const StyledFormLabel = styled(FormLabel)(() => ({
  color: "#ffa500",
  marginBottom: "4px",
}));

const ResetPassword: React.FC = () => {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const navigate = useNavigate();

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

  const handleConfirmPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    const password = (document.getElementById("password") as HTMLInputElement)
      ?.value;
    const confirmPassword = (
      document.getElementById("confirmPassword") as HTMLInputElement
    )?.value;

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
              name="password"
              placeholder="password"
              type="password"
              id="password"
              autoComplete="new-password"
              required
              fullWidth
              variant="outlined"
            />
            <StyledFormLabel htmlFor="confirmPassword" sx={{ mt: 2 }}>
              Conferma Password
            </StyledFormLabel>
            <StyledTextField
              error={passwordError}
              helperText={passwordErrorMessage}
              name="confirmPassword"
              placeholder="Conferma password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              required
              fullWidth
              variant="outlined"
            />
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
