import { Link } from "react-router-dom";

export default function ButtonRegistrati() {
  return (
    <p style={{ color: "black", fontWeight: "bold" }}>
      Non hai un account?
      <Link
        to={"/registration"}
        style={{
          textDecoration: "none",
          color: "black",
          fontWeight: "bold",
        }}
      >
        Registrati
      </Link>
    </p>
  );
}
