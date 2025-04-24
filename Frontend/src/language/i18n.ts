import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importa le traduzioni
import translationIT from './locales/it/translation.json';
import translationEN from './locales/en/translation.json';
import translationFR from './locales/fr/translation.json';
import translationES from './locales/es/translation.json';

// Le risorse di traduzione
const resources = {
  italiano: {
    translation: translationIT
  },
  english: {
    translation: translationEN
  },
  français: {
    translation: translationFR
  },
  español: {
    translation: translationES
  }
};

i18n
  // Rileva la lingua del browser
  .use(LanguageDetector)
  // Passa i18n all'istanza react-i18next
  .use(initReactI18next)
  // Inizializza i18next
  .init({
    resources,
    fallbackLng: 'italiano',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false, // non necessario per React
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    }
  });

export default i18n;