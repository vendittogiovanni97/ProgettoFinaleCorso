import { FormControl } from "@mui/material";
import { StyledFormLabel, StyledTextField } from "../../../../styled/ResetPasswordStyled";
import PasswordVisibility from "../../../../customizations/PasswordVisibility";

interface PasswordContainerProps {
  showPassword: boolean;
  toggleVisibility: () => void;
  error: boolean;
  errorMessage: string;
  name: string;
  placeholder: string;
}

export default function PasswordContainer({
  showPassword,
  toggleVisibility,
  error,
  errorMessage,
  name,
  placeholder,
}: PasswordContainerProps) {
  return (
    <FormControl>
      <StyledFormLabel htmlFor={name}>
        {name === "password" ? "Password" : "Conferma Password"}
      </StyledFormLabel>
      <StyledTextField
        error={error}
        helperText={errorMessage}
        type={showPassword ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        id={name}
        autoComplete="new-password"
        required
        fullWidth
        variant="outlined"
        InputProps={{
          endAdornment: <PasswordVisibility onClick={toggleVisibility} visible={showPassword} />,
        }}
      />
    </FormControl>
  );
}