module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: "#F8C291", // pastel peach
        accent: "#E77F67", // warm coral
        grayText: "#555",
      },
      borderRadius: {
        xl: "1rem",
      },
      boxShadow: {
        card: "0 8px 30px rgba(0, 0, 0, 0.06)",
      },
    },
  },
  plugins: [],
};
