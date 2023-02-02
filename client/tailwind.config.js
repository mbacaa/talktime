/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      height: {
        chatHeight: "36rem",
        convHeight: "35rem",
        adminHeight: "16rem",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
