/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    fontFamily: {
      "bitter-rose": ['"bitter-rose"'],
      chillax: ['"chillax"'],
      "chillax-regular": ['"chillax-regular"'],
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      width: {
        128: "32rem",
      },
      backgroundImage: {
        banner: "url('./Assets/Images/bg-logo.avif')",
      },
    },
  },
  plugins: [],
};
