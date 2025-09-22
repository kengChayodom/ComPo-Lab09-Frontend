/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      scale: {
        '101': '1.01',
      },
      boxShadow: {
        'sp': '0 4px 8px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}
