const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['var(--outfit-font)', ...fontFamily.sans],
        serif: ['var(--outfit-font)', ...fontFamily.serif],
      },
      animation: {
        'scrollAnimation': 'scroll 10s linear infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-100%))' },
        }
      }

    },
  },
  plugins: [],
}