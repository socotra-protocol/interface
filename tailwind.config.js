const withMT = require("@material-tailwind/react/utils/withMT")

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#B3E0CB",
          DEFAULT: "#299D66",
          dark: "#006837",
        },
        secondary: {
          light: "#C9C5BB",
          DEFAULT: "#8B877E",
          dark: "#635947",
        },
        white: {
          light: "#FFFFFF",
          DEFAULT: "#FCFBF9",
          dark: "#EDE7DA",
        },
        gray: {
          darkest: "#1f2d3d",
          dark: "#3c4858",
          DEFAULT: "#c0ccda",
          light: "#e0e6ed",
          lightest: "#f9fafc",
        },
      },
      fontFamily: {
        body: ['"Sora"'],
      },
      fontSize: {
        md: "16px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
  ],
})
