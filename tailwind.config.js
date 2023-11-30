/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        tempo: "pulse var(--tempo) cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      colors: {
        red: {
          500: "#ED2E38",
        },
      },
    },
  },
  plugins: [],
};
