"use client";
import React, { useContext } from "react";
import { ThemeProvider } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { themeLight } from "@/theme/theme";
import ThemeContextProvider, { ThemeContext } from "@/context/ThemeContext";
axios.defaults.baseURL = process.env.NEXT_PUBLIC_URL_API;
axios.defaults.withCredentials = true;
export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });
  const { theme } = useContext(ThemeContext)
  return (
    <>
      <ThemeContextProvider>
        <CacheProvider value={cacheRtl}>
          <ThemeProvider theme={theme || themeLight}>
            {children}
            <Toaster toastOptions={{ style: { direction: "ltr" } }} />
          </ThemeProvider>
        </CacheProvider>
      </ThemeContextProvider>
    </>
  );
}
