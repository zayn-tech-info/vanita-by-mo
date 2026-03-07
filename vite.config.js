import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5137,
    host: true,
    allowedHosts: ["adventurous-aquamarine.outray.app", ".outray.app"],
    hmr: {
      clientPort: 443,
      host: "adventurous-aquamarine.outray.app",
    },
  },
});
