import { useState } from "react";
import { Button2 } from "../../../../styled/LoginStyled";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { handleGoogleLogin } from "../../hooks/LoginHooks";

export default function ButtonGoogle() {
  const [isGoogleHovered, setIsGoogleHovered] = useState(false);

  return (
    <Button2
      onClick={handleGoogleLogin}
      className="social-button google-button"
      style={{
        background: isGoogleHovered ? "#ffb700" : "black",
        color: isGoogleHovered ? "black" : "#ffd700",
      }}
      onMouseEnter={() => setIsGoogleHovered(true)}
      onMouseLeave={() => setIsGoogleHovered(false)}
    >
      <FontAwesomeIcon icon={faGoogle} /> Accedi con Google
    </Button2>
  );
}
