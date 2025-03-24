import * as React from "react";
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
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { ResponsiveAppBarProps } from "../../types/components/typesDashboard";

// Definisci i colori del tema
const themeColors = {
  primary: "#ffd700", // Giallo dorato
  secondary: "#ffa500", // Giallo arancione
  backgroundDark: "#1a1a1a", // Nero scuro
  backgroundLight: "#2a2a2a", // Grigio scuro
  textLight: "#ffffff", // Testo bianco
  textDark: "#000000", // Testo nero
  borderColor: "#444", // Colore del bordo
  hoverColor: "rgba(255, 215, 0, 0.1)", // Giallo trasparente per hover
};

// Stile per la barra di ricerca
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(themeColors.primary, 0.15), // Sfondo giallo trasparente
  "&:hover": {
    backgroundColor: alpha(themeColors.primary, 0.25), // Sfondo giallo più scuro al passaggio del mouse
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

// Stile per l'input della barra di ricerca
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: themeColors.textLight, // Testo bianco
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const settings = ["Profile", "Settings", "Dashboard", "Logout"];

const ResponsiveAppBar: React.FC<ResponsiveAppBarProps> = ({ onMenuClick }) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [searchValue, setSearchValue] = React.useState("");
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (setting?: string) => {
    setAnchorElUser(null);

    if (setting === "Logout") {
      navigate("/Login");
    }
  };

  const handleSearch = () => {
    console.log("Search value:", searchValue);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: themeColors.backgroundLight }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo e menu hamburger per vista mobile */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { xs: "flex" } }}
            onClick={onMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: themeColors.primary, // Colore giallo di default
              textDecoration: "none",
              "&:hover": {
                color: "#ffff00", // Giallo più chiaro al passaggio del mouse
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
              color: themeColors.primary, // Colore giallo di default
              textDecoration: "none",
              "&:hover": {
                color: "#ffff00", // Giallo più chiaro al passaggio del mouse
              },
            }}
          >
            DROCSID
          </Typography>
          {/* Barra di ricerca */}
          <Search
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              maxWidth: "400px",
            }}
          >
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Box sx={{ flexGrow: 1 }}>
              <IconButton
                aria-label="search"
                onClick={handleSearch}
                sx={{ color: themeColors.primary }}
              >
                <SearchIcon />
              </IconButton>
            </Box>
          </Search>

          {/* Spazio flessibile che spinge l'avatar a destra */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Avatar e menu utente */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu}>
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
                  backgroundColor: themeColors.backgroundLight, // Sfondo scuro
                  color: themeColors.textLight, // Testo nero
                },
              }}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handleCloseUserMenu(setting)}
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
