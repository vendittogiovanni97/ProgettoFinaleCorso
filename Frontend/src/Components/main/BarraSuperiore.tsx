import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useNavigate } from "react-router-dom";
import { ResponsiveAppBarProps } from "../../types/components/typesDashboard";
import { useThemeContext } from "../../context/ThemeContextDefinition";

//header per drocsid searchbar togglecolor

const ResponsiveAppBar: React.FC<ResponsiveAppBarProps> = ({ onMenuClick }) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const { mode, toggleColorMode } = useThemeContext();

  const navigate = useNavigate();

  const settings = ["Profile", "Settings", "Dashboard", "Logout"];

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (setting?: string) => {
    setAnchorElUser(null);

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
    <AppBar
      style={{ display: "flex" }}
      position="fixed"
      sx={{
        backgroundColor: themeColors.backgroundLight,
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Container maxWidth={false} disableGutters>
        <Toolbar disableGutters>
          {/* Logo e menu hamburger per vista mobile */}
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
            onClick={onMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
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

          {/* Spazio flessibile che spinge l'avatar e il theme toggle a destra */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Theme Toggle Button */}
          {toggleColorMode && (
            <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
              <Tooltip
                title={
                  mode === "dark"
                    ? "Passa al tema chiaro"
                    : "Passa al tema scuro"
                }
              >
                <IconButton
                  onClick={toggleColorMode}
                  color="inherit"
                  sx={{ color: themeColors.textLight }}
                >
                  {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
              </Tooltip>
            </Box>
          )}

          {/* Avatar e menu utente */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Eleonora Baroni"
                  src="/static/images/avatar/2.jpg"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
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
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
