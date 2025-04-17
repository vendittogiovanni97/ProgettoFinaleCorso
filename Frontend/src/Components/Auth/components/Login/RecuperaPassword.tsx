import { Link } from "react-router-dom";

export default function RecuperPassword() {
  return (
    <div className="text-center mt-3">
      <p style={{ color: "black", fontWeight: "bold" }}>
        Hai dimenticato la password?
      </p>
      <Link
        to={"/resetpassword"}
        style={{
          textDecoration: "none",
          color: "black",
          fontWeight: "bold",
        }}
      >
        Recupera Password
      </Link>
    </div>
  );
}
