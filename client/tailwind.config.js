/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      height: {
        chatHeight: "36rem",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
