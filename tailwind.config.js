const colors = require("tailwindcss/colors");
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
        anakiwa: "#79edff",
        mint: "#c8e1f5",
        300: "#657795",
        500: "#2f12dc",
      },

      "brand-purple": {
        heart: "#892cd8",
        portage: "#9e9ff6",
        heliotrope: "#c574f4",
        melrose: "#c3a9ff",
        100: "#7a6eaa",
        300: "#7645d9",
        500: "#820fc9",
        700: "#5911d2",
        900: "#280d5f",
      },
      "brand-rose": {
        mauve: "#e9a6ff",
        lavender: "#f9a9e3",
        "hot-pink": "#ff62a1",
        "pale-rose": "#ffdfed",
      },
      "brand-pink": {
        300: "#ff0bac",
        500: "#d50cb6",
        700: "#ac0ebf",
      },
      green: colors.green,
      slate: colors.slate,
      black: colors.black,
      transparent: colors.transparent,
      white: colors.white,
      gray: colors.gray,
      zinc: colors.zinc,
      neutreal: colors.neutral,
      stone: colors.stone,
      red: colors.red,
      orange: colors.orange,
      amber: colors.amber,
      yellow: colors.yellow,
      lime: colors.lime,
      emerald: colors.emerald,
      teal: colors.teal,
      cyan: colors.cyan,
      sky: colors.sky,
      blue: colors.blue,
      indigo: colors.indigo,
      violet: colors.violet,
      purple: colors.purple,
      fuchsie: colors.fuchsia,
      pink: colors.pink,
      rose: colors.rose,

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
};
