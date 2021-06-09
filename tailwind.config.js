module.exports = {
  purge: [
    "./components/**/*.tsx",
    "./components/**/*.jsx",
    "./pages/**/*.tsx",
    "./pages/**/*.jsx",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    fontFamily: {
      default: ["ibm_plex", "sans-serif"],
    },
    extend: {
      screens: {
        xs: "320px",
      },
      colors: {
        primary: { default: "#302b63", dark: "#0f0c29" },
        dark: "#0a1931",
        gray: { 10: "#f4f4f4" },
      },
      boxShadow: {
        light:
          "0px 10px 16px rgba(47, 128, 237, 0.03), 0px 16px 24px rgba(47, 128, 237, 0.03)",
        strong:
          "0px 8px 8px rgba(47, 128, 237, 0.08), 0px 4px 4px rgba(47, 128, 237, 0.06)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
