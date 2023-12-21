/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      tran: "transparent",
      gold: {
        base: "#927c4e",
        light: "#927d4e8b",
      },
      black: {
        base: "#000000",
        light: "#222",
      },
      white: {
        base: "#e9e9e9",
        light: "#fff",
      },
    },
    fontFamily: {
      avenir: ["Avenir-Next", "Avenir", "sans-serif"],
    },
    screens: {
      xl: { max: "1300px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1000px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "750px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "400px" },
      // => @media (max-width: 639px) { ... }
    },
  },
  plugins: [],
};
