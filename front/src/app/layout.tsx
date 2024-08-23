import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { ToastContainer } from "react-toastify";
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
        <Header />
        {children}
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}
