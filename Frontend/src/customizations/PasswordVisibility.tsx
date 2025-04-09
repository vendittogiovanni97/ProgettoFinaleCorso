import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Button from "../styled/PasswordVisibilityStyled";
import { PasswordVisibilityProps } from "../types/components/typesPasswordVisibility";

const PasswordVisibility: React.FC<PasswordVisibilityProps> = ({ onClick }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    onClick();
  };

  return (
    <Button type="button" onClick={togglePasswordVisibility}>
      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} color="white" />
    </Button>
  );
};

export default PasswordVisibility;
