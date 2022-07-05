module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      // Default colors
      "default-text": "#111012",

      // Branding colors
      "brand-blue": {
        picton: "#40dbf2",
        anakiwa: "79edff",
        mint: "c8e1f5",
      },

      "brand-purple": {
        heart: "#892cd8",
        portage: "#9e9ff6",
        heliotrope: "#c574f4",
        melrose: "#c3a9ff",
      },

      "brand-rose": {
        mauve: "#e9a6ff",
        lavender: "#f9a9e3",
        "hot-pink": "#ff62a1",
        "pale-rose": "#ffdfed",
      },

      // Colors
      pink: {
        300: "#ff0bac",
        500: "#d50cb6",
        700: "#ac0ebf",
      },
      purple: {
        100: "#7a6eaa",
        300: "#7645d9",
        500: "#820fc9",
        700: "#5911d2",
        900: "#280d5f",
      },
      blue: {
        300: "#657795",
        500: "#2f12dc",
      },
      white: {
        300: "#f8fbfe",
        500: "#f0f5f9",
        700: "#ececec",
      },
      gray: {
        100: "#d7d7d7",
        200: "#bdbdbd",
        700: "#424242",
        900: "#262626",
      },

      // Action colors
      action: {
        error: "#ff0000",
        valid: "#00ff00",
        warning: "#fca300",
      },
    },
    extend: {
      fontFamily: {
        heading: ["Righteous", "sans-serif"],
        base: ["Source Sans Pro", "sans-serif"],
      },
    },
  },
  plugins: [],
};
