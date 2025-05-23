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
  response: {
    headers: {
<<<<<<< HEAD
      "Content-Security-Policy": "frame-ancestors 'self'",
=======
      "Content-Security-Policy":
        "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; form-action 'self'; base-uri 'self'; object-src 'none';",
      "X-Frame-Options": "DENY",
      "X-Content-Type-Options": "nosniff",
      "X-XSS-Protection": "1; mode=block",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
>>>>>>> 646a99152644c158e8e242b2f03de241675e37b6
    },
  },
});
