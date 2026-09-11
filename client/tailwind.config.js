/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#0a0a0f",
        cyan: "#00f5ff",
        violet: "#8b5cf6",
        emerald: "#10b981",
        glass: "rgba(255, 255, 255, 0.05)",
      },
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
        sora: ["Sora", "sans-serif"],
      },
      boxShadow: {
        neon: "0 0 10px #00f5ff, 0 0 20px #00f5ff",
        violet: "0 0 10px #8b5cf6, 0 0 20px #8b5cf6",
      },
    },
  },
  plugins: [],
};