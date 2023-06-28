/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        Project:{
          red: {
            fist: "#f20f38",
            second: "#79071c",
            third: "#180105"
          },
          black: "#0D0D0D",
          white: "#F2F2F2"
        }
      },
      fontFamily: {
        rock: ['New Rocker']
      }
    },
  },
  plugins: [],
}
