/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        passion: ["Passion One", "cursive"],
        muli: ["Muli", "sans-serif"],
      },
      backgroundImage: {
        "404bg": "url('../../404bg.jpg')",
      },
      colors: {
        "custom-black": "#222225",
        "custom-pink": "#ff00b4",
      },
    },
  },
  plugins: [],
};
