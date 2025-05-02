import { Typography } from "@mui/material";

export default function HeaderLogin() {
  return (
    <Typography
      component="h2"
      variant="h5"
      sx={{
        width: "100%",
        color: "black",
        fontSize: "2.5rem",
        fontFamily: "'Roboto', sans-serif",
        fontWeight: "bold",
        mb: 3,
        textAlign: "center",
        textTransform: "uppercase", 
      }}
    >
      Login
    </Typography>
  );
}
