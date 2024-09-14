"use client";
import React from "react";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@mui/material";
import theme from "@/theme/theme";
import { CacheProvider } from "@emotion/react";
// import "react-toastify/dist/ReactToastify.css";


import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
  });
  return (
    <>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          {children}
          <ToastContainer />
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}
