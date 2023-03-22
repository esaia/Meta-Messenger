/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        fade: "fade 1s ease-in-out 1",
      },

      keyframes: {
        fade: {
          "0%": { opacity: "0" },
          "50%": { opacity: "0" },
          "100%": { opacity: "100" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animation-delay")],
};
