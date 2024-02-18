/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  // eslint-disable-next-line no-undef-
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        myTheme: {
          "primary": "#364156",
          "secondary": "#11151C",
          "accent": "#212D40",
          "neutral": "#1D3461",
          "info": "#6290C8",
          "success": "#55a630",
          "warning": "#ffda3d",
          "error": "#bf0603",
        },
      }
    ],
  },
}