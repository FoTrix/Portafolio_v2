// @ts-check

import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["debug"],
    },
  },
  

  adapter: netlify(),
  integrations: [icon(), react()],
  output: "server",
});
