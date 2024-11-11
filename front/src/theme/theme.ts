"use client";
import { createTheme } from "@mui/material/styles";
const themeLight = createTheme({
  typography: {
    fontFamily: "__fontSahel_7a8a2f",
  },
  cssVariables: true,
  direction: "rtl",
  colorSchemes: {
    dark: false
  }
});
const themeDark = createTheme({
  typography: {
    fontFamily: "__fontSahel_7a8a2f",
  },
  cssVariables: true,
  direction: "rtl",
  colorSchemes: {
    dark: true
  }
});
export { themeLight, themeDark };