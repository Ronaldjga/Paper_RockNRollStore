/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/patterns/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
});
module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/patterns/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        project:{
          primary: {
            50: "#FEF3F5",
            100: "#FEE7EB",
            200: "#FCC3CD",
            300: "#FA9FAF",
            400: "#F65774",
            500: "#F20F38",
            600: "#DA0E32",
            700: "#910922",
            800: "#6D0719",
            900: "#490511",
          },
          secondary: {
            50: "#F4F3F4",
            100: "#E9E8E9",
            200: "#C9C5C8",
            300: "#A8A3A7",
            400: "#675D66",
            500: "#261824",
            600: "#221620",
            700: "#170E16",
            800: "#110B10",
            900: "#0B070B",
          },
          tertiary: {
            50: "#FCFDFD",
            100: "#F9FBFA",
            200: "#F1F6F3",
            300: "#E8F0EB",
            400: "#D6E4DD",
            500: "#C5D9CE",
            600: "#B1C3B9",
            700: "#76827C",
            800: "#59625D",
            900: "#3B413E",
          },
          quaternary: {
            50: "#FEFBF7",
            100: "#FEF7EF",
            200: "#FCEBD6",
            300: "#FADFBE",
            400: "#F6C78D",
            500: "#F2AF5C",
            600: "#DA9E53",
            700: "#916937",
            800: "#6D4F29",
            900: "#49351C",
          }
        }
      },
      fontFamily: {
        rock: ['New Rocker']
      }
    },
  },
  plugins: [],
}
