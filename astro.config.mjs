// @ts-check

import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  adapter: netlify(),
  integrations: [icon()],
  output: 'server'
});