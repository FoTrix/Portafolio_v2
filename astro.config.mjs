// @ts-check

import { defineConfig, envField } from "astro/config";
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
    envPrefix: "RESEND_",
  },

  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: "server", access: "public" }),
    },
  },

  adapter: netlify(),
  integrations: [icon(), react()],
  output: "server",
});
