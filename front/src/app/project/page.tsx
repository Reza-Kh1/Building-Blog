import Breadcrums from "@/components/Breadcrums/Breadcrums";
import CardProjects from "@/components/CardProjects/CardProjects";
import LoadingSearch from "@/components/LoadingSearch/LoadingSearch";
import Pagination from "@/components/Pagination/Pagination";
import React, { Suspense } from "react";
import BannerCallUs from "../../components/BannerCallUs/BannerCallUs";
import ContactSocialMedia from "@/components/ContactSocialMedia/ContactSocialMedia";
import OrderSearch from "@/components/OrderSearch/OrderSearch";
import { fetchApi } from "@/action/fetchApi";
import { AllProjectType, FilterQueryType } from "../type";
import NotFound from "../not-found";
import { Metadata } from "next";
const getData = async (query: FilterQueryType) => {
  const url = "project?" + new URLSearchParams(query);
  const data = await fetchApi({ url, tags: ["project"], next: 5000 });
  if (data.error) return NotFound();
  return data
};
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || "http://localhost:3000"),
  title: 'پروژه‌ها | ساخت یار',
  description: 'در این صفحه می‌توانید با پروژه‌های انجام شده توسط تیم ساخت یار آشنا شوید. پروژه‌های ساختمانی ما شامل انواع خدمات ساخت و ساز، معماری و پیمانکاری می‌باشند.',
  keywords: [
    'پروژه‌های ساختمانی',
    'پروژه‌های ساخت و ساز',
    'پیمانکاری',
    'ساخت و ساز',
    'معماری',
    'پروژه‌های معماری',
    'پروژه‌های عمرانی',
  ],
  openGraph: {
    title: 'پروژه‌ها | ساخت یار',
    description: 'با پروژه‌های مختلف و انجام شده توسط تیم ساخت یار آشنا شوید. خدمات ما شامل مشاوره، طراحی و اجرای پروژه‌های مختلف ساختمانی و عمرانی می‌باشد.',
    url: `${process.env.NEXT_PUBLIC_URL + "/project"}`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_URL + "/about-us.jpg"}`,
        width: 800,
        height: 600,
        alt: 'پروژه‌های ساخت یار',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'پروژه‌ها | ساخت یار',
    description: 'پروژه‌های مختلف ساختمانی و عمرانی انجام شده توسط تیم ساخت یار را در این بخش مشاهده کنید.',
    images: [`${process.env.NEXT_PUBLIC_URL + "/about-us.jpg"}`],
  },
  robots: "index, follow",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_URL + "/project"}`,
  },
};
export default async function page({
  searchParams,
}: {
  searchParams: FilterQueryType;
}) {
  const data: AllProjectType = await getData(searchParams);
  return (
    <>
      <Breadcrums />
      <div className="classDiv mb-20">
        <section className="mt-6 flex justify-between items-center">
          <h1 className="lg:text-xl font-semibold">پروژه های ما</h1>
          <div className="w-3/6">
            <OrderSearch />
          </div>
        </section>
        <div className="my-5 md:my-10 grid grid-cols-2 md:grid-cols-3 gap-5">
          {data.rows.map((item, index) => (
            <CardProjects project={item} key={index} />
          ))}
        </div>
        <div>
          <Suspense fallback={<LoadingSearch />}>
            <Pagination pagination={data.paginate} />
          </Suspense>
        </div>
      </div>
      <BannerCallUs />
      <ContactSocialMedia />
    </>
  );
}
