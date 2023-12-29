/// <reference types="vitest" />
/// <reference types="vite/client" />

import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

// https://vitejs.dev/config/

dotenv.config();

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//       find: "./runtimeConfig",
//       replacement: "./runtimeConfig.browser",
//     },
//   },
//   build: {
//     outDir: "build",
//   },
//   test: {
//     globals: true,
//     environment: "jsdom",
//     css: true,
//     setupFiles: ["./src/testconfig/setup.ts"],
//     pool: "forks",
//   },
//   envDir: "./",
//   envPrefix: "VITE_",
//   define: {
//     VITE_SUPABASE_KEY: JSON.stringify(process.env.VITE_SUPABASE_KEY),
//     VITE_SUPABASE_URL: JSON.stringify(process.env.VITE_SUPABASE_URL),
//   },
// });

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
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
    envPrefix: "VITE_",
    define: {
      VITE_SUPABASE_KEY: JSON.stringify(env.VITE_SUPABASE_KEY),
      VITE_SUPABASE_URL: JSON.stringify(env.VITE_SUPABASE_URL),
    },
  };
});
