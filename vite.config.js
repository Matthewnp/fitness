// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({

  plugins: [
    react(),
    tailwindcss(),
  ],
  base:'/',
  server: {
    proxy: {
      "/api": {
        target: "https://fitness-kl4y.onrender.com",
        changeOrigin: true,
      },
    },
  },

});