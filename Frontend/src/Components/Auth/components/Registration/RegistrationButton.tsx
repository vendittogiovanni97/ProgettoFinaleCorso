import { useState } from "react";
import { Button } from "../../../../styled/RegistrationStyle";

export default function RegistrationButton() {
  const [isOvered, setIsOvered] = useState(false);
  return (
    <Button
      type="submit"
      style={{
        background: isOvered ? "#ffb700" : "black",
        color: isOvered ? "black" : "#ffd700",
      }}
      onMouseEnter={() => setIsOvered(true)}
      onMouseLeave={() => setIsOvered(false)}
    >
      Registrati
    </Button>
  );
}