import { Typography } from "@mui/material";

export default function HeaderLogin() {
  return (
    <Typography
      component="h2"
      variant="h5"
      sx={{
        width: "100%",
        color: "black",
        fontSize: "clamp(1.9rem, 11vw, 2.7rem)",
        mb: 3,
        textAlign: "center",
        fontWeight: "bold",
      }}
    >
      Login
    </Typography>
  );
}
