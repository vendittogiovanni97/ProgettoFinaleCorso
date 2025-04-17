import { Typography } from "@mui/material";
import useThemeColors from "../../../styled/BarraSuperioreStyled";
const Header = () => {
  const themeColors = useThemeColors();
  return (
    <>
    <Typography
      variant="h6"
      noWrap
      component="a"
      href="#app-bar-with-responsive-menu"
      sx={{
        mr: 2,
        display: { xs: "none", md: "flex" },
        flexGrow: 1,
        fontFamily: "monospace",
        fontWeight: 700,
        letterSpacing: ".3rem",
        color: themeColors.primary,
        textDecoration: "none",
        "&:hover": {
          color: "#ffff00",
        },
      }}
    >
      DROCSID
    </Typography>
    <Typography
    variant="h5"
    noWrap
    component="a"
    href="#"
    sx={{
      mr: 2,
      display: { xs: "flex", md: "none" },
      flexGrow: 1,
      fontFamily: "monospace",
      fontWeight: 700,
      letterSpacing: ".3rem",
      color: themeColors.primary,
      textDecoration: "none",
      "&:hover": {
        color: "#ffff00",
      },
    }}
  >
    DROCSID
  </Typography>
  </>
  );
};

export default Header;
