import { useThemeContext } from '../context/ThemeContextDefinition';

const useThemeColors = () => {
  const { mode } = useThemeContext();
  
  return {
    primary: "#ffd700", // Giallo dorato (rimane uguale in entrambi i temi)
    secondary: mode === 'dark' ? "#ffa500" : "#ff8c00", // Leggermente diverso tra i temi
    backgroundDark: mode === 'dark' ? "#1a1a1a" : "#f5f5f5",
    backgroundLight: mode === 'dark' ? "#2a2a2a" : "#ffffff",
    textLight: mode === 'dark' ? "#ffffff" : "#000000",
    textDark: mode === 'dark' ? "#000000" : "#ffffff",
    borderColor: mode === 'dark' ? "#444" : "#ddd",
    hoverColor: mode === 'dark' ? "rgba(255, 215, 0, 0.1)" : "rgba(255, 215, 0, 0.2)",
  };
};

export default useThemeColors;
    
  



