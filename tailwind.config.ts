import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#090300",
          container: "#2E1900",
          fixed: "#3D2609",
          "fixed-dim": "#5C3D12",
        },
        on_primary: {
          DEFAULT: "#FBF9F8",
          container: "#FBF9F8",
        },
        secondary: {
          DEFAULT: "#6B5C47",
          container: "#D6C7B3",
        },
        on_secondary: {
          DEFAULT: "#FBF9F8",
          container: "#2E1900",
        },
        surface: {
          DEFAULT: "#FBF9F8",
          container_lowest: "#F5F1EE",
          container_low: "#EFEBE5",
          container: "#E8E1D8",
          container_high: "#DED5C8",
          container_highest: "#D4CCBF",
        },
        on_surface: {
          DEFAULT: "#1C1612",
          variant: "#4A4039",
        },
        outline: {
          DEFAULT: "#4A4039",
          variant: "rgba(74, 64, 57, 0.15)",
        },
        error: {
          DEFAULT: "#BA1A1A",
          container: "#FFDAD6",
        },
        on_error: {
          container: "#410002",
        },
        success: {
          DEFAULT: "#2E7D32",
          container: "#A5D6A7",
        },
        warning: {
          DEFAULT: "#E65100",
          container: "#FFE0B2",
        },
      },
      fontFamily: {
        serif: ["Marcellus", "Georgia", "serif"],
        sans: ["Manrope", "system-ui", "sans-serif"],
      },
      boxShadow: {
        ambient: "0px 24px 48px rgba(9, 3, 0, 0.06)",
        elevated: "0px 8px 24px rgba(9, 3, 0, 0.08)",
      },
      borderRadius: {
        lg: "0.5rem",
        xl: "1rem",
        "2xl": "1.5rem",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },
    },
  },
  plugins: [],
};
export default config;
