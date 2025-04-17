import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button2 } from "../../../../styled/LoginStyled";
import { handleFacebookLogin } from "../../hooks/LoginHooks";
import { useState } from "react";

export default function ButtonFacebook() {
  const [isFacebookHovered, setIsFacebookHovered] = useState(false);

  return (
    <Button2
      onClick={handleFacebookLogin}
      className="social-button facebook-button mt-2"
      style={{
        background: isFacebookHovered ? "#ffb700" : "black",
        color: isFacebookHovered ? "black" : "#ffd700",
      }}
      onMouseEnter={() => setIsFacebookHovered(true)}
      onMouseLeave={() => setIsFacebookHovered(false)}
    >
      <FontAwesomeIcon icon={faFacebook} /> Accedi con Facebook
    </Button2>
  );
}
