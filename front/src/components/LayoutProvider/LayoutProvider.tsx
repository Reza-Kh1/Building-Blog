"use client";
import React from "react";
import { ThemeProvider } from "@mui/material";
import theme from "@/theme/theme";
import { CacheProvider } from "@emotion/react";
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { Toaster } from 'react-hot-toast';

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
          <Toaster />
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}
