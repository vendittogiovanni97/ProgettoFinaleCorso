import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";


export const Card = styled(MuiCard)(() => ({
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
  
  export const ContainerResetPassword = styled(Stack)(() => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundImage: "url(/pics/image1.jpg)",
    backgroundSize: "cover",
  }));
  
  export const StyledButton = styled(Button)(() => ({
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
  
  export const StyledTextField = styled(TextField)(() => ({
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
  
  export const StyledFormLabel = styled(FormLabel)(() => ({
    color: "#ffa500",
    marginBottom: "4px",
  }));
  