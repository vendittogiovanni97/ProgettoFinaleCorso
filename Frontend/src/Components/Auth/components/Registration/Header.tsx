import { Typography } from "@mui/material";

export default function HeaderRegistration() {
  return (
    <>
      <Typography
        component="h1"
        variant="h4"
        sx={{
          textAlign: "center",
          color: "black",
          fontSize: "30px",
          padding: "5px",
          margin: "0, 0, 20px, 0",
          fontWeight: "bold",
        }}
      >
        DROCSID
      </Typography>
      <Typography
        component="h2"
        variant="h5"
        sx={{
          textAlign: "center",
          color: "black",
          fontSize: "20px",
          padding: "10px",
          fontWeight: "bold",
        }}
      >
        Registration
      </Typography>
    </>
  );
}