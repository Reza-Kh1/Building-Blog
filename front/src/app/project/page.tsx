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
import { Metadata } from "next";
import { dataApi } from "@/data/tagsName";
import DontData from "@/components/DontData/DontData";
import { notFound } from "next/navigation";
const nameSite = process.env.NEXT_PUBLIC_NAME_SITE || ""
const getData = async (query: FilterQueryType) => {
  const url = dataApi.projects.url + "?" + new URLSearchParams(query);
  const data = await fetchApi({ url, tags: dataApi.projects.tags, next: dataApi.projects.cache });
  if (data.error) return notFound();
  return data
};
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || "http://localhost:3000"),
  title: `پروژه‌ها | ${nameSite}`,
  description: `در این صفحه می‌توانید با پروژه‌های انجام شده توسط تیم ${nameSite} آشنا شوید. پروژه‌های ساختمانی ما شامل انواع خدمات ساخت و ساز، معماری و پیمانکاری می‌باشند.`,
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
    title: `پروژه‌ها | ${nameSite}`,
    description: `با پروژه‌های مختلف و انجام شده توسط تیم ${nameSite} آشنا شوید. خدمات ما شامل مشاوره، طراحی و اجرای پروژه‌های مختلف ساختمانی و عمرانی می‌باشد.`,
    url: `${process.env.NEXT_PUBLIC_URL + "/project"}`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_URL + "/about-us.jpg"}`,
        width: 800,
        height: 600,
        alt: `پروژه‌های ${nameSite}`,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `پروژه‌ها | ${nameSite}`,
    description: `پروژه‌های مختلف ساختمانی و عمرانی انجام شده توسط تیم ${nameSite} را در این بخش مشاهده کنید.`,
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
          <h1 className="lg:text-xl font-semibold">پروژه ها</h1>
          <div className="w-3/6">
            <OrderSearch />
          </div>
        </section>
        {data.rows.length ?
          (
            <div className="my-5 md:my-10 grid grid-cols-2 md:grid-cols-3 gap-5">
              {data.rows.map((item, index) => (
                <CardProjects project={item} key={index} />
              ))}
            </div>
          )
          :
          <DontData name="هیچ پروژه ای یافت نشد!" />
        }
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
