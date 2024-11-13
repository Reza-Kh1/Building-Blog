import { fetchApi } from "@/action/fetchApi";
import Breadcrums from "@/components/Breadcrums/Breadcrums";
import Cards from "@/components/Cards/Cards";
import OrderSearch from "@/components/OrderSearch/OrderSearch";
import Pagination from "@/components/Pagination/Pagination";
import React, { Suspense } from "react";
import { AllPostType } from "../type";
import ContactSocialMedia from "@/components/ContactSocialMedia/ContactSocialMedia";
import NotFound from "../not-found";
import { Metadata } from "next";
const getData = async () => {
  const data = await fetchApi({ url: "post?page=1" });
  if (data.error) return NotFound();
  return data
};
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || "http://localhost:3000"),
  title: 'وبلاگ | ساخت یار',
  description: 'ما برای افزایش آگاهی شما مقالاتی را نوشتیم که میتواند در انتخاب هاتون بهتون کمک کند.',
  keywords: ['پروژه‌های ساختمانی', 'مشاوره ساخت‌وساز', 'ساخت یار', 'خدمات پیمانکاری'],
  openGraph: {
    title: 'وبلاگ | ساخت یار',
    description: 'ما برای افزایش آگاهی شما مقالاتی را نوشتیم که میتواند در انتخاب هاتون بهتون کمک کند.',
    url: `${process.env.NEXT_PUBLIC_URL + "/blog"}`,
    type: 'website',
    images: [
      {
        url: `${process.env.NEXTAUTH_URL}/category.jpg`,
        width: 1200,
        height: 630,
        alt: 'صفحه وبلاگ سایت ساخت یار',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'وبلاگ | ساخت یار',
    images: [`${process.env.NEXTAUTH_URL}/category.jpg`],
    description: 'ما برای افزایش آگاهی شما مقالاتی را نوشتیم که میتواند در انتخاب هاتون بهتون کمک کند.',
  },
  robots: "index, follow",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_URL + "/blog"}`,
  },
};
export default async function page() {
  const data: AllPostType = await getData();
  return (
    <>
      <Breadcrums />
      <div className="classDiv">
        <section className="flex w-full items-center justify-between">
          <h1 className="font-semibold lg:text-xl">وبلاگ</h1>
          <div className="w-2/6">
            <OrderSearch />
          </div>
        </section>
        <div className="my-5">
          <Cards props={data.rows} />
        </div>
        <Suspense fallback={"در حال بارگیری ..."}>
          <Pagination pagination={data.paginate} />
        </Suspense>
      </div>
      <ContactSocialMedia />
    </>
  );
}
