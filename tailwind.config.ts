/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}", // Tus archivos de proyecto
    "./node_modules/magic-ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        responsive: "100dvh",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
