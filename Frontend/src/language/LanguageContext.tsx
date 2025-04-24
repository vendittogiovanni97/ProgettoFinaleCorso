import React, { createContext, useContext, useState, useEffect } from 'react';
import i18n from './i18n';

// Interfaccia per il contesto della lingua
export interface LanguageContextType {
  language: string;
  changeLanguage: (lang: string) => void;
}

// Valore predefinito del contesto
const defaultContextValue: LanguageContextType = {
  language: 'italiano',
  changeLanguage: () => {},
};

// Creazione del contesto
export const LanguageContext = createContext<LanguageContextType>(defaultContextValue);

// Hook personalizzato per accedere al contesto
export const useLanguageContext = () => useContext(LanguageContext);

// Provider component
interface LanguageContextProviderProps {
  children: React.ReactNode;
}

export const LanguageContextProvider: React.FC<LanguageContextProviderProps> = ({ children }) => {
  // Recupera la lingua salvata in localStorage se presente, altrimenti usa 'italiano'
  const [language, setLanguage] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language');
      return savedLanguage || 'italiano';
    }
    return 'italiano';
  });

  // Funzione per cambiare la lingua
  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  // Salva la lingua in localStorage quando cambia
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', language);
    }
  }, [language]);

  // Imposta la lingua iniziale
  useEffect(() => {
    i18n.changeLanguage(language);
  }, []);

  const value = {
    language,
    changeLanguage
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContextProvider;