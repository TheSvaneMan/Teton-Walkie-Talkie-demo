import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // This ensures it stays on the port you were seeing earlier
    open: true, // Automatically opens the browser
  },
});
