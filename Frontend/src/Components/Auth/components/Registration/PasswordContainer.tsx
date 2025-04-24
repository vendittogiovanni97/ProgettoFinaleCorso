import { PasswordContainer as StyledPasswordContainer, PasswordInput } from "../../../../styled/RegistrationStyle";
import PasswordVisibility from "../../../../customizations/PasswordVisibility";

interface PasswordContainerProps {
  showPassword: boolean;
  toggleVisibility: () => void;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PasswordContainer({
  showPassword,
  toggleVisibility,
  name,
  placeholder,
  value,
  onChange
}: PasswordContainerProps) {
  return (
    <StyledPasswordContainer style={{ position: "relative", marginBottom: "1rem" }}>
      <PasswordInput
        type={showPassword ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
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
          onClick={toggleVisibility}
        />
      </div>
    </StyledPasswordContainer>
  );
}