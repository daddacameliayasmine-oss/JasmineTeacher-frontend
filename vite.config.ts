import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Configuration Vite : React + proxy /api vers le backend en dev pour eviter CORS.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": "http://localhost:3310",
    },
  },
});
