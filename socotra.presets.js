module.exports = {
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
        sans: ["Sora"],
      },
      fontSize: {
        md: "16px",
      },
      gridTemplateColumns: {
        navbar: "220px 1fr 290px",
        member: "230px 1fr 180px",
        subdao: "400px 1fr",
        "member-input": "230px 1fr 60px",
        "dashboard-detail": "320px 1fr",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
  ],
}
