import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@pages": path.resolve(__dirname, "./src/pages"),
        "@hooks": path.resolve(__dirname, "./src/hooks"),
        "@utils": path.resolve(__dirname, "./src/utils"),
        "@services": path.resolve(__dirname, "./src/services"),
        "@contexts": path.resolve(__dirname, "./src/contexts"),
        "@config": path.resolve(__dirname, "./src/config"),
        "@types": path.resolve(__dirname, "./src/types"),
        "@theme": path.resolve(__dirname, "./src/theme"),
        "@assets": path.resolve(__dirname, "./src/assets"),
      },
    },
    server: {
      port: 5173,
      host: true,
      proxy: {
        // Proxy API requests to backend
        "/api": {
          target: env.VITE_API_BASE_URL || "http://localhost:3000",
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, "/api"),
        },
      },
    },
    build: {
      outDir: "dist",
      sourcemap: mode === "development",
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom"],
            mui: ["@mui/material", "@mui/icons-material"],
            router: ["react-router-dom"],
            form: ["react-hook-form", "@hookform/resolvers", "yup"],
            query: ["@tanstack/react-query"],
          },
        },
      },
    },
    define: {
      // Define global constants
      __APP_VERSION__: JSON.stringify(env.VITE_APP_VERSION || "1.0.0"),
      __APP_ENV__: JSON.stringify(env.VITE_APP_ENV || "development"),
    },
    css: {
      devSourcemap: mode === "development",
    },
  };
});
