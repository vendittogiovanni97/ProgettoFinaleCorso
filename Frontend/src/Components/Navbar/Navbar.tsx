import MenuButton from "./components/MenuButton";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import useThemeColors from "../../styled/BarraSuperioreStyled";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import ThemeToggleButton from "./components/ThemeToggleButton";
import { Box } from "@mui/material";
import AvatarSideBar from "./components/Avatar";
import { ResponsiveAppBarProps } from "../../types/components/typesDashboard";

const Navbar: React.FC<ResponsiveAppBarProps> = ({ onMenuClick }) => {
  const themeColors = useThemeColors(); // Usa i colori dinamici basati sul tema
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
      }}
    >
      <Container maxWidth={false} disableGutters>
        <Toolbar disableGutters>
          <MenuButton 
          onClick={handleMenuClick} />
          <Header />
          <SearchBar />
          <Box sx={{ flexGrow: 1 }} />
          <ThemeToggleButton />
          <AvatarSideBar />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
