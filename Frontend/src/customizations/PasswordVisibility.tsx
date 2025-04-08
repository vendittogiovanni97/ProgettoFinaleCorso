import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import  Button from "../styled/PasswordVisibilityStyled";
import { PasswordVisibilityProps } from "../types/components/typesPasswordVisibility";



const PasswordVisibility: React.FC<PasswordVisibilityProps> = ({ onClick }) => {
   
const [showPassword, setShowPassword] = useState(false);

const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    onClick();
};


return (
    <Button
        type="button"
        onClick={togglePasswordVisibility}
        style={{
            padding: "8px 12px",
            backgroundColor: "black",
            border: "1px solid #ccc",
            borderRadius: "4px",
            cursor: "pointer",
        }}
    >
        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
    </Button>
);
}

export default PasswordVisibility;