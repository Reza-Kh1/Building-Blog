import { ThemeProvider, createTheme } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import React from 'react'
import App from './App.tsx'
const theme = createTheme({
  typography: {
    fontFamily: 'iranSans, Arial',
  }
});
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </CacheProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
