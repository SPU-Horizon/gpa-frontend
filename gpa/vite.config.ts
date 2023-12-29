/// <reference types="vitest" />
/// <reference types="vite/client" />

import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

// https://vitejs.dev/config/

dotenv.config();

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      find: "./runtimeConfig",
      replacement: "./runtimeConfig.browser",
    },
  },
  build: {
    outDir: "build",
  },
  test: {
    globals: true,
    environment: "jsdom",
    css: true,
    setupFiles: ["./src/testconfig/setup.ts"],
    pool: "forks",
  },
  envDir: "./",
  // envPrefix: "VITE_",
  define: {
    // VITE_supabaseUrl: process.env.VITE_SUPABASE_URL,
    // VITE_supabaseKey: process.env.VITE_SUPABASE_KEY,
  },
});
