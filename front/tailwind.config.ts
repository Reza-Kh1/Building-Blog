import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      textColor: {
        "h-dark": "#e9ecef",
        "p-dark": "#dadada",
        "s-dark": "#b0b0b0"
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        "custom-dark": "0px 1px 4px #000000"
      },
      boxShadowColor: {
        "low-dark": "#171717",
        "full-dark": "#000000"
      },
      borderColor: {
        "bg-dark": "#6b7280"
      },
      backgroundColor: {
        "hight-dark":"#1d1d1d",
        "input-dark": "#48484b69",
        "custom-dark": "#212121",
        "info-dark": "#232528"
      },
    },
  },
  plugins: [],
};
export default config;
