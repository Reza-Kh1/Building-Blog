import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import LayoutProvider from "@/components/LayoutProvider/LayoutProvider";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import React from "react";
import Calling from "@/components/Calling/Calling";

import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
export const metadata: Metadata = {
  title: "ساخت یار - اولین منبع برای ساختن",
  description:
    "ما در اینجا به شما نیروهای مجرب و مصالح نوین ساختمانی را معرفی می‌کنیم. با ما همراه باشید تا از آخرین تکنولوژی‌ها و بهترین پیمانکاران در صنعت ساخت و ساز مطلع شوید.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <React.StrictMode>
          <AppRouterCacheProvider options={{ key: "css" }}>
            <LayoutProvider>
              <Header />
              {children}
              <Calling />
              <Footer />
            </LayoutProvider>
          </AppRouterCacheProvider>
        </React.StrictMode>
      </body>
    </html>
  );
}
