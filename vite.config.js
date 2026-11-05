// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Use relative asset URLs so the built app works both at the domain root
  // and under GitHub Pages' /fitness/ project path.
  base: "./",
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      "/api": {
        target: "https://fitness-7vy3.onrender.com",
        changeOrigin: true,
      },
    },
  },
});
