import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import useThemeColors from "../../../styled/BarraSuperioreStyled";
import { useNavigate } from "react-router-dom";


interface MenuAvatarProps {
  anchorEl: HTMLElement | null;
  setAnchorEl: (anchorEl: HTMLElement | null) => void;
}

const MenuAvatar = ({ anchorEl, setAnchorEl }: MenuAvatarProps) =>  {
  const themeColors = useThemeColors();
  const navigate = useNavigate();
  const settings = ["Profile", "Settings", "Logout"];

  const handleCloseUserMenu = (setting?: string) => {
    setAnchorEl(null);

    if (!setting) return; // Se non è stato selezionato nulla, esci

    if (setting === "Logout") {
      navigate("/login");
    }
    if (setting === "Profile") {
      navigate("/profilepage");
    }
    if (setting === "Settings") {
      navigate("/settings");
    }
  };
  return (
    <Menu
      sx={{ mt: "45px" }}
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={() => handleCloseUserMenu()}
      PaperProps={{
        style: {
          backgroundColor: themeColors.backgroundLight,
          color: themeColors.textLight,
        },
      }}
    >
      {settings.map((setting) => (
        <MenuItem
          key={setting}
          onClick={() => handleCloseUserMenu(setting)}
          sx={{
            "&:hover": {
              backgroundColor: themeColors.hoverColor,
            },
          }}
        >
          <Typography
            sx={{ textAlign: "center", color: themeColors.textLight }}
          >
            {setting}
          </Typography>
        </MenuItem>
      ))}
    </Menu>
  );
};
export default MenuAvatar;
