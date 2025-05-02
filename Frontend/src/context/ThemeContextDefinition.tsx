import { createContext, useContext } from 'react';
import { PaletteMode } from '@mui/material';

// Interfaccia per il contesto del tema
export interface ThemeContextType {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

// Valore predefinito del contesto
const defaultContextValue: ThemeContextType = {
  mode: 'dark',
  toggleColorMode: () => {},
};

// Creazione del contesto
export const ThemeContext = createContext<ThemeContextType>(defaultContextValue);

// Hook personalizzato per accedere al contesto
export const useThemeContext = () => useContext(ThemeContext);