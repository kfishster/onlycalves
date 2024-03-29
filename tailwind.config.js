/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        slowspin: 'spin 5s linear infinite',
        cardright: 'cardright ease-out 2s',
        cardleft: 'cardleft ease-out 2s',
      },
      rotate: {
        16: '16deg'
      },
      aspectRatio: {
        '3/4': '3 / 4'
      },
      keyframes: {
        cardright: {
          '0%': {
            transform: 'rotate(0deg) translateX(-8.5rem) scale(.75)'
          },
          '100%': {
            transform: 'rotate(12deg)'
          }
        },
        cardleft: {
          '0%': {
            transform: 'rotate(0deg) translateX(8.5rem) scale(.75)'
          },
          '100%': {
            transform: 'rotate(-12deg)'
          }
        }
      }
    },
  },
  plugins: [],
  darkMode: 'class',
  future: {
    hoverOnlyWhenSupported: true
  }
}
