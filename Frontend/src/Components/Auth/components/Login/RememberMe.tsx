import { useState } from "react";
import { Form } from "react-bootstrap";

export default function RememberMe() {
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  return (
    <Form.Group controlId="formRememberMe">
      <Form.Check
        type="checkbox"
        label="Ricordami"
        checked={rememberMe}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setRememberMe(e.target.checked)
        }
        style={{ color: "black", fontWeight: "bold" }}
      />
    </Form.Group>
  );
}
