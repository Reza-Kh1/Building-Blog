import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import LayoutProvider from "@/components/LayoutProvider/LayoutProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import React from "react";
import Calling from "@/components/Calling/Calling";
import "./globals.css";
import "swiper/css";
import "swiper/css/navigation";
import 'swiper/css/pagination';
import local from "next/font/local"
export const metadata: Metadata = {
  title: "ساخت یار - اولین منبع برای ساختن",
  description:
    "ما در اینجا به شما نیروهای مجرب و مصالح نوین ساختمانی را معرفی می‌کنیم. با ما همراه باشید تا از آخرین تکنولوژی‌ها و بهترین پیمانکاران در صنعت ساخت و ساز مطلع شوید.",
};
const fontSahel = local({ src: "../fonts/Sahel.woff", variable: "--sahel-font" })
const fontIran = local({ src: "../fonts/Vazir-Regular.woff", variable: "--iransans-font" })
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${fontSahel.variable} ${fontIran.variable}`}>
        <React.StrictMode>
          <AppRouterCacheProvider options={{ key: "css" }}>
            <LayoutProvider>
              <div className="bg-white dark:bg-custom-dark dark:text-p-dark">
                <Header />
                <main>
                  {children}
                </main>
                <footer>
                  <Footer />
                </footer>
              </div>
              <Calling />
            </LayoutProvider>
          </AppRouterCacheProvider>
        </React.StrictMode>
      </body>
    </html>
  );
}
