import React, { useMemo } from "react";
import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { GlobalStyles } from "@mui/material";
import { ThemeContextProvider } from "../context/ThemeContext";
import { useThemeContext } from "../context/ThemeContextDefinition";

// Variabili CSS globali
const globalStyles = {
  ":root": {
    // Colori per il tema scuro
    "--primary-color-dark": "#ffd700", // Giallo dorato
    "--background-dark-dark": "#1a1a1a", // Nero scuro per lo sfondo
    "--background-light-dark": "#2a2a2a", // Grigio scuro per i contenitori
    "--text-light-dark": "#ffffff", // Testo bianco
    "--text-dark-dark": "#000000", // Testo nero
    "--border-color-dark": "#444", // Colore del bordo
    "--hover-color-dark": "rgba(255, 215, 0, 0.1)", // Giallo trasparente per hover

        // ... existing code ...

    // Colori per il tema chiaro
    "--primary-color-light": "#ffd700",
    "--background-dark-light": "#eef2f7",    // Grigio azzurrino per lo sfondo principale
    "--background-light-light": "#fcfcfc",   // Bianco sporco per i contenitori
    "--text-light-light": "#2c3e50",         // Blu scuro per il testo
    "--text-dark-light": "#ffffff",
    "--border-color-light": "#cbd5e1",       // Bordo più pronunciato grigio-blu
    "--hover-color-light": "rgba(255, 215, 0, 0.15)",
    "--shadow-light": "0 2px 4px rgba(0,0,0,0.08)",  // Ombra sottile per profondità
  },
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

// Funzione per creare il tema per styled-components
const getStyledTheme = (mode: "light" | "dark") => ({
  colors: {
    backgroundDark: mode === "dark" ? "#1a1a1a" : "#eef2f7",
    backgroundLight: mode === "dark" ? "#2a2a2a" : "#fcfcfc",
    primary: "#ffd700",
    textLight: mode === "dark" ? "#ffffff" : "#2c3e50",
    hoverColor: mode === "dark"
      ? "rgba(255, 215, 0, 0.1)"
      : "rgba(255, 215, 0, 0.15)",
    // aggiungi altre proprietà se servono
  },
});

const ThemeProviderInner: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { mode } = useThemeContext();

  // Definizione dei temi MUI
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#ffd700", // Giallo dorato consistente in entrambi i temi
          },
          secondary: {
            main: mode === "dark" ? "#ffa500" : "#ff8c00", // Arancione, leggermente più intenso nel tema chiaro
          },
          background: {
            default: mode === "dark" ? "#1a1a1a" : "#f5f5f5",
            paper: mode === "dark" ? "#2a2a2a" : "#ffffff",
          },
          text: {
            primary: mode === "dark" ? "#ffffff" : "#000000",
            secondary: mode === "dark" ? "#cccccc" : "#555555",
          },
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                scrollbarColor:
                  mode === "dark" ? "#6b6b6b #2b2b2b" : "#959595 #f5f5f5",
                "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
                  backgroundColor: mode === "dark" ? "#2b2b2b" : "#f5f5f5",
                  width: "8px",
                  height: "8px",
                },
                "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
                  borderRadius: 8,
                  backgroundColor: mode === "dark" ? "#6b6b6b" : "#959595",
                  minHeight: 24,
                },
                "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
                  {
                    backgroundColor: mode === "dark" ? "#8f8f8f" : "#bdbdbd",
                  },
                "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
                  {
                    backgroundColor: mode === "dark" ? "#8f8f8f" : "#bdbdbd",
                  },
                "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
                  {
                    backgroundColor: mode === "dark" ? "#8f8f8f" : "#bdbdbd",
                  },
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                borderRadius: '0',
                border: mode === 'light' ? '1px solid #e2e8f0' : 'none',
                boxShadow: mode === 'light' 
                  ? '0 4px 6px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.1)' 
                  : 'none',
                background: mode === 'light' 
                  ? 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)' 
                  : '#2a2a2a',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: mode === 'light' 
                    ? '0 6px 8px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.12)' 
                    : 'none'
                }
              }
            }
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: '0',
                border: mode === 'light' ? '1px solid #e2e8f0' : 'none',
                boxShadow: mode === 'light' 
                  ? '0 4px 6px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.1)' 
                  : 'none',
                background: mode === 'light' 
                  ? 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)' 
                  : '#2a2a2a',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: mode === 'light' 
                    ? '0 6px 8px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.12)' 
                    : 'none'
                }
              }
            }
          },
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: '0',
                textTransform: 'none',
                fontWeight: 500,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-1px)'
                }
              }
            }
          }
        },
      }),
    [mode]
  );

  // Stile globale per le variabili CSS dinamiche
  const dynamicStyles = {
    "@import": "tailwindcss",
    ":root": {
      "--primary-color":
        mode === "dark"
          ? "var(--primary-color-dark)"
          : "var(--primary-color-light)",
      "--background-dark":
        mode === "dark"
          ? "var(--background-dark-dark)"
          : "var(--background-dark-light)",
      "--background-light":
        mode === "dark"
          ? "var(--background-light-dark)"
          : "var(--background-light-light)",
      "--text-light":
        mode === "dark" ? "var(--text-light-dark)" : "var(--text-light-light)",
      "--text-dark":
        mode === "dark" ? "var(--text-dark-dark)" : "var(--text-dark-light)",
      "--border-color":
        mode === "dark"
          ? "var(--border-color-dark)"
          : "var(--border-color-light)",
      "--hover-color":
        mode === "dark"
          ? "var(--hover-color-dark)"
          : "var(--hover-color-light)",
    },
  };

  return (
    <MUIThemeProvider theme={theme}>
      <StyledThemeProvider theme={getStyledTheme(mode)}>
        <CssBaseline />
        <GlobalStyles styles={globalStyles} />
        <GlobalStyles styles={dynamicStyles} />
        {children}
      </StyledThemeProvider>
    </MUIThemeProvider>
  );
};

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <ThemeContextProvider>
      <ThemeProviderInner>{children}</ThemeProviderInner>
    </ThemeContextProvider>
  );
};

export default ThemeProvider;
