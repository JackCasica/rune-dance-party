/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ronchi: "#f5c144",
        "willpower-orange": "#fb5607",
        "vivid-raspberry": "#ff006e",
        "blue-purple": "#8338ec",
        "brilliant-azure": "#3986ff",
      },
    },
  },
  plugins: [],
};
