/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        slowspin: 'spin 5s linear infinite'
      }
    },
  },
  plugins: [],
}
