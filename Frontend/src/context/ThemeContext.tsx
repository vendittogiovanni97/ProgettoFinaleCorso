import React, { useState, useEffect } from 'react';
import { PaletteMode } from '@mui/material';
import { ThemeContext } from './ThemeContextDefinition';

// Provider component
interface ThemeContextProviderProps {
  children: React.ReactNode;
}

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({ children }) => {
  // Recupera il tema salvato in localStorage se presente, altrimenti usa 'dark'
  const [mode, setMode] = useState<PaletteMode>(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('themeMode');
      return (savedMode as PaletteMode) || 'dark';
    }
    return 'dark';
  });

  // Funzione per cambiare il tema
  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Salva la modalità tema in localStorage quando cambia
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('themeMode', mode);
      // Aggiorna le variabili CSS in uso in base al tema
      document.documentElement.setAttribute('data-theme', mode);
    }
  }, [mode]);

  const value = {
    mode,
    toggleColorMode
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;

