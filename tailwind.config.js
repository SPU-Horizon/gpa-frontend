/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        tran: "transparent",
        gold: {
          base: "#927c4e",
          light: "#927d4e8b",
          bright: "#f5d061",
        },
        black: {
          base: "#000000",
          light: "#222",
        },
        white: {
          base: "#e9e9e9",
          light: "#fff",
          dark: "#e1e1e1",
        },
        grey: {
          dark: "#2e2e2e",
        },
        db: {
          blue: "#030712",
        },
      },
    },

    fontFamily: {
      avenir: ["Avenir-Next", "Avenir", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
    },
    screens: {
      xl: { max: "1300px" },
      // => @media (max-width: 1300px) { ... }

      lg: { max: "1000px" },
      // => @media (max-width: 1000px) { ... }

      md: { max: "750px" },
      // => @media (max-width: 750px) { ... }

      sm: { max: "400px" },
      // => @media (max-width: 400px) { ... }
      xs: { max: "325px" },
      // => @media (max-width: 325px) { ... }
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("tailwindcss-animate")],
  darkMode: "class",
};
