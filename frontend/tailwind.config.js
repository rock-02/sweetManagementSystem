/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0d9488", // teal-600
        secondary: "#fbbf24", // amber-400
        accent: "#f472b6", // pink-400
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Roboto", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 24px 0 rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};
