/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        "headerGreen": "#A5CC61",
      },
    },
  },
  plugins: [],
};
