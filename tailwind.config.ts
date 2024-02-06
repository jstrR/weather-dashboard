/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#4d4d4d',
        secondary: '#28a2f7',
        tretiary: '#bbd7ec'
      }
    },
  },
  plugins: [],
};