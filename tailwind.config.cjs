/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['"Rubik"', 'sans-serif'],
    },
    colors: {
      'primary': '#0096B2',
      'secondary': '#9EABBE',
      'danger': '#ED5151',
      'danger-light': '#fce5e5',
      'success': '#67B771',
      'success-light': '#e3f7f0',
      'warning': '#FBB040',
      'warning-light': '#fdf6dc',
      'white': '#fff',
      'gray': {
        300: '#B0BCC9',
        400: '#8E9EAF',
      },
    },
  },
  plugins: [],
}
