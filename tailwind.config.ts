import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    colors: {
      blue: "#4F76FC",
      pink: "#ff49db",
      orange: "#EB5757",
      green: "#1AAF55",
      "gray-dark": "#273444",
      gray: "#8492a6",
      "gray-light": "#d3dce6",
      "border-light-gray": "#E3E3E3",
      "text-secondary": "A9A9A9",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      textColor: {
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        body: "var(--text-body)",
      },
      backgroundColor: {
        primary: "var(--background-primary)",
        secondary: "var(--background-secondary)",
        hover: "var(--background-hover)",
      },
      borderColor: {
        primary: "var(--border-primary)",
        secondary: "var(--border-secondary)",
      },
    },
  },
  plugins: [],
};
export default config;