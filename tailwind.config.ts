import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
      },
      colors: {
        brand: {
          50: "#f2f7ff",
          100: "#e6efff",
          200: "#c4dbff",
          300: "#9dc3ff",
          400: "#6b9dff",
          500: "#4a7dff",
          600: "#335cf2",
          700: "#2947c3",
          800: "#253b9a",
          900: "#21347a",
        },
      },
      boxShadow: {
        soft: "0 20px 60px -40px rgba(15, 23, 42, 0.35)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
