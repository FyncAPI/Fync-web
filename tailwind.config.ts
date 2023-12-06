import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
      },
      colors: {
        default: "#1c358c",
        primary: {
          50: "#eff5ff",
          100: "#dae9ff",
          200: "#bfd9ff",
          300: "#91c1ff",
          400: "#5e9ffc",
          500: "#387af9",
          600: "#225aee",
          700: "#1a46db",
          800: "#1c39b1",
          900: "#1c358c",
        },
        secondary: {
          50: "#fff1f3",
          100: "#ffe0e4",
          200: "#fecdd6",
          300: "#fda4b4",
          400: "#fb718d",
          500: "#f43f68",
          600: "#e11d53",
          700: "#be1245",
          800: "#9f1241",
          900: "#88133d",
        },
      },
    },
  },
} satisfies Config;
