import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#930000",
          container: "#c00000",
          fixed: "#ffdad4",
          fixedDim: "#ffb4a8",
        },
        secondary: {
          DEFAULT: "#735c00",
          gold: "#d4af37",
          container: "#fed65b",
          fixed: "#ffe088",
          fixedDim: "#e9c349",
        },
        tertiary: {
          DEFAULT: "#5b4300",
          container: "#795900",
          fixed: "#ffdf9e",
        },
        background: "#fcf9f8",
        surface: {
          DEFAULT: "#fcf9f8",
          bright: "#fcf9f8",
          dim: "#dcd9d9",
          variant: "#e5e2e1",
          container: {
            lowest: "#ffffff",
            low: "#f6f3f2",
            DEFAULT: "#f0eded",
            high: "#eae7e7",
            highest: "#e5e2e1",
          },
        },
        "on-surface": "#1c1b1b",
        "on-surface-variant": "#5d3f3b",
        "inverse-surface": "#313030",
        "inverse-on-surface": "#f3f0ef",
        outline: "#926f69",
        "outline-variant": "#e7bdb6",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-montserrat)", "sans-serif"],
        headline: ["var(--font-montserrat)", "sans-serif"],
      },
      maxWidth: {
        "container-max": "1280px",
      },
      spacing: {
        "margin-desktop": "64px",
        "margin-mobile": "20px",
        gutter: "24px",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
