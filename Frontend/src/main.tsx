import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AuthProvider } from "./context/Auth.Provider.tsx";
import {LanguageContextProvider} from "./language/LanguageContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LanguageContextProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
    </LanguageContextProvider>
  </StrictMode>
);
