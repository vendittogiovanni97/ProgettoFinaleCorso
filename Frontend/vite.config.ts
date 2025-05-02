import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: [
      "26b5-195-94-150-225.ngrok-free.app", // Il tuo dominio Ngrok attuale
      ".ngrok-free.app", // Permetti tutti i domini Ngrok (consigliato)
    ],
    host: "0.0.0.0", // Importante per accesso da rete locale
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        timeout: 30000,
        ws: true,
      }
    }
  },
});
