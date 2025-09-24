import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@mektec/animation": path.resolve(
        __dirname,
        "../../packages/animation/src"
      ),
    },
  },
  server: {
    fs: {
      allow: [".."],
    },
  },
  optimizeDeps: {
    include: ["@mektec/animation"],
  },
  esbuild: {
    logOverride: { "this-is-undefined-in-esm": "silent" },
  },
});
