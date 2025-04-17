import { useState } from "react";
import { LoginButton } from "../../../../styled/LoginStyled";

export default function Button() {
  const [isOvered, setIsOvered] = useState(false);
  return (
    <>
      <LoginButton
        style={{
          background: isOvered ? "#ffb700" : "black",
          color: isOvered ? "black" : "#ffd700",
        }}
        type="submit"
        onMouseEnter={() => setIsOvered(true)}
        onMouseLeave={() => setIsOvered(false)}
      >
        Accedi
      </LoginButton>
    </>
  );
}
