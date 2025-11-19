/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    // La sección 'extend' es CRUCIAL.
    // Si no pones 'extend', borras todos los colores por defecto de Tailwind.
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // <-- ESTO CAMBIA TODO EL TEXTO
      },
      colors: {
        'brand-blue': '#0D1B2A',   // Tu azul oscuro
        'brand-orange': '#FF7F11', // Tu naranja
      }
    },
  },
  plugins: [],
}