import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: ".",
  base: "./",
  publicDir: "public",
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        stories: path.resolve(__dirname, "stories.html"),
        apply: path.resolve(__dirname, "apply.html"),
      },
    },
  },
});
