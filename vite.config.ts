import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules/firebase/")) {
            return "firebase-vendor";
          }
          if (
            id.includes("node_modules/@mui/") ||
            id.includes("node_modules/@emotion/")
          ) {
            return "mui-vendor";
          }
          if (id.includes("node_modules/react-router-dom/")) {
            return "router-vendor";
          }
          return null;
        },
      },
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.ts",
  },
});
