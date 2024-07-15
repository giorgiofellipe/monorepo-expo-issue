/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: "#5D57FB",
        "blue-dark": "#1A0359",
        yellow: "#F4B94A",
        salad: "#6FBE36",
        green: "#18AB1A",
        "red-dark": "#AB1818",
        "red-light": "#E34F62",
        "gray-800": "#100826",
        "gray-700": "#474559",
        "gray-600": "#76788C",
        "gray-500": "#9597A6",
        "gray-400": "#CCCDD9",
        "gray-300": "#DCDDE5",
        "gray-200": "#F0F1F5",
        "gray-100": "#F5F7FA",
        "gray-50": "#F9F9FB",
        "border-primary": "rgba(0, 0, 0, 0.07)",
      },
    },
  },
  plugins: [],
};
