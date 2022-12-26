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

    },
  },
  plugins: [],
}
