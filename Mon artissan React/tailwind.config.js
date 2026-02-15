/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Tu peux définir ici tes couleurs personnalisées si besoin
        electricBlue: '#1e6091',
      },
    },
  },
  plugins: [],
}