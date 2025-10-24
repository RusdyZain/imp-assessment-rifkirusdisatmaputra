// tailwind.config.js
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [require("daisyui")],
  daisyui: { themes: ["corporate", "dark"] },
};
