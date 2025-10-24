/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["corporate", "dark", "light"],
  },
};
