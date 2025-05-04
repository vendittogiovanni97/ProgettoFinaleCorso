import MenuButton from "./components/MenuButton";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import useThemeColors from "../../styled/BarraSuperioreStyled";
import Header from "./components/Header";
import ThemeToggleButton from "./components/ThemeToggleButton";
import { Box } from "@mui/material";
import AvatarSideBar from "./components/Avatar";
import { ResponsiveAppBarProps } from "../../types/components/typesDashboard";
import { useThemeContext } from "../../context/ThemeContextDefinition";
// import SearchBar from "./components/SearchBar"; // REMOVE this line

const Navbar: React.FC<ResponsiveAppBarProps> = ({ onMenuClick }) => {
  const themeColors = useThemeColors();
  const { mode } = useThemeContext();
  
  const handleMenuClick = () => {
    onMenuClick();
  };

  return (
    <AppBar
      style={{ display: "flex" }}
      position="fixed"
      sx={{
        backgroundColor: themeColors.backgroundLight,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        width: '100%',
        borderRadius: 0,
        borderBottom: mode === 'dark' ? '1px solid #333' : '1px solid #ddd',
        boxShadow: mode === 'dark' ? '0 2px 4px rgba(0, 0, 0, 0.2)' : '0 2px 4px rgba(255, 255, 255, 0.2)',
        transition: 'background-color 0.3s ease, border-color 0.3s ease',
        "&:hover": {
          backgroundColor: mode === 'dark' ? '#444' : '#f0f0f0',
        },
      }}
    >
      <Container maxWidth={false}>
        <Toolbar>
          <MenuButton onClick={handleMenuClick} />
          <Header />
          {/* <SearchBar /> */} {/* REMOVE or comment out this line */}
          <Box sx={{ width: '20px' }} />
          <ThemeToggleButton />
          <AvatarSideBar />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
