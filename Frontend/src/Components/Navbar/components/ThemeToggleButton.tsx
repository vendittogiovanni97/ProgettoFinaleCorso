import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useThemeContext } from "../../../context/ThemeContextDefinition";
import useThemeColors from "../../../styled/BarraSuperioreStyled";

const ThemeToggleButton = () => {
  const { mode, toggleColorMode } = useThemeContext();
  const themeColors = useThemeColors(); // Usa i colori dinamici basati sul tema

  return (
    <>
      {toggleColorMode && (
        <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
          <Tooltip
            title={
              mode === "dark" ? "Passa al tema chiaro" : "Passa al tema scuro"
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
    </>
  );
};
export default ThemeToggleButton;
