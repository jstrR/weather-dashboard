/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#3A3A3C',
        primaryLight: '#404040',
        secondary: '#28a2f7',
        tretiary: '#bbd7ec',
        textLight: '#E9EDF0'
      }
    },
  },
  plugins: [],
};