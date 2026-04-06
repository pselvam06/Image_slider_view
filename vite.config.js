import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Use root in dev, but project subpath when building for GitHub Pages.
  base: command === "build" ? "/Image_slider_view/" : "/",
}));
