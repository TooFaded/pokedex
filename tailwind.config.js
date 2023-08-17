/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.html", "./src/**/*.js", "./src/**/*.jsx"],
  theme: {
    extend: {
      colors: {
        pokemonRed: "rgb(208, 57, 2)",
      },
    },
    keyframes: {
      bounce: {
        "0%, 100%": { transform: "translateY(0)" },
        "50%": { transform: "translateY(-10px)" },
      },
    },
    animation: {
      bounce: "bounce 0.5s",
    },
  },
  plugins: [],
};
