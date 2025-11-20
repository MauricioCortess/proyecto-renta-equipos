/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // ESTA LÍNEA ES LA CLAVE PARA QUITAR LA LETRA ANTIGUA
        sans: ['Inter', 'sans-serif'], 
      },
      colors: {
        'brand-blue': '#0D1B2A',
        'brand-orange': '#FF7F11',
      },
      boxShadow: {
        'soft': '0 10px 40px -10px rgba(0,0,0,0.08)',
      }
    },
  },
  plugins: [],
}