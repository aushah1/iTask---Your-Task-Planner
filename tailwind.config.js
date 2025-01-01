/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        "::selection": {
          backgroundColor: "#fff",
          color: "#266b62",
        },
      });
    },
  ],
};
