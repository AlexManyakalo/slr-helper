import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
      "@api": path.resolve(__dirname, "./backend"),
      "@src": path.resolve(__dirname, "./src"),
    },
  },
});
