import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import useThemeColors from "../../../styled/BarraSuperioreStyled";

type Props = {
  onClick: () => void; // Definisci il tipo della funzione onClick
};
const MenuButton = ({ onClick }: Props) => {
  const themeColors = useThemeColors();

  return (
    <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="menu"
      sx={{
        mr: 2,
        display: { xs: "flex" },
        color: themeColors.textLight,
      }}
      onClick={onClick} // Passa la funzione onClick come prop
    >
      <MenuIcon />
    </IconButton>
  );
};

export default MenuButton;
