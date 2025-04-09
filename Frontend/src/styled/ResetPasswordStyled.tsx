import { styled as styled2 } from "@mui/material/styles";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import styled from "styled-components";

export const FormContainer = styled.div`
  background: rgba(255, 215, 39, 0.85); // 85% di opacità
  padding: 2.5rem;
  border-radius: 1rem;
  box-shadow:
    0 0 25px rgba(255, 215, 0, 0.4),
    // Ombra più soft
    0 0 10px rgba(255, 215, 0, 0.2);
  backdrop-filter: blur(4px); // Sfocatura leggera
  border: 1px solid rgba(255, 215, 0, 0.5); // Bordo più definito
  z-index: 1;
  width: 90%;
  max-width: 450px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow:
      0 0 35px rgba(255, 215, 0, 0.5),
      0 0 15px rgba(255, 215, 0, 0.3);
    background: rgb(253, 219, 1); // Leggermente più opaco al hover
  }
`;

export const ContainerResetPassword = styled2(Stack)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundImage: "url(/pics/image1.jpg)",
  backgroundSize: "cover",
}));

export const StyledButton = styled2(Button)(() => ({
  backgroundColor: "black",
  color: "#ffd700",
  fontWeight: "bold",
  marginTop: "16px",
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

export const StyledTextField = styled2(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "white",
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "black",
    },
    "&.Mui-focused fieldset": {
      borderColor: "black",
    },
  },
  "& .MuiInputBase-input": {
    color: "black",
  },
  "& .MuiFormHelperText-root": {
    color: "#ffa500",
  },
}));

export const StyledFormLabel = styled2(FormLabel)(() => ({
  color: "black",
  marginBottom: "4px",
}));

// Nuovi componenti stilizzati per migliorare il componente ResetPassword
export const TitleTypography = styled2(Typography)(() => ({
  width: "100%",
  color: "black",
  fontWeight: "bold",
  fontSize: "clamp(1.5rem, 10vw, 2rem)",
  textAlign: "center",
  marginBottom: "8px",
}));

export const SubtitleTypography = styled2(Typography)(() => ({
  width: "100%",
  color: "black",
  fontSize: "clamp(1.3rem, 8vw, 1.7rem)",
  marginBottom: "24px",
  textAlign: "center",
  fontWeight: "bold",
}));
