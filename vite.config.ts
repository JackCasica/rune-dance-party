import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import rune from "vite-plugin-rune";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "", // Makes paths relative
  plugins: [react(), rune({ logicPath: path.resolve("./src/logic.ts") })],
  server: {
    host: "0.0.0.0",
    port: 5173, // Optional, if you want to specify a different port
  },
});
