import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/postcss";

export default defineConfig(({ mode }) => {
  // Load env from the client folder based on the mode (development, production, etc.)
  const env = loadEnv(mode, "./client/.env.local", "");

  return {
    plugins: [
      TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
      react(),
    ],
    css: {
      postcss: {
        plugins: [tailwindcss()],
      },
    },
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:4000",
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
