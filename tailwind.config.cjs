module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        crimson: "#e01e5a",
        darkGrey1: "#333",
        purple1: "#8256d0",
        modalMask: "rgba(0, 0, 0, 0.5)",
      },
      boxShadow: {
        modalContent: "0 0 10px -4px #8256d0",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
