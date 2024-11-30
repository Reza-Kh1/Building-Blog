import { fetchApi } from "@/action/fetchApi";
import React, { Suspense } from "react";
import OrderSearch from "@/components/OrderSearch/OrderSearch";
import { AllExpertType, FilterQueryType } from "../type";
import CardExperts from "@/components/CardExperts/CardExperts";
import Pagination from "@/components/Pagination/Pagination";
import DontData from "@/components/DontData/DontData";
import ContactSocialMedia from "@/components/ContactSocialMedia/ContactSocialMedia";
import Breadcrums from "@/components/Breadcrums/Breadcrums";
import { Metadata } from "next";
import { dataApi } from "@/data/tagsName";
import { notFound } from "next/navigation";
const nameSite = process.env.NEXT_PUBLIC_NAME_SITE || "";
const getData = async (query: FilterQueryType) => {
  const url = dataApi.experts.url + "?" + new URLSearchParams(query);
  const data = await fetchApi({
    url,
    next: dataApi.experts.cache,
    tags: dataApi.experts.tags,
  });
  if (data.error) return notFound();
  return data;
};
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || "http://localhost:3000"),
  title: `مجری ها | ${nameSite}`,
  description:
    "با مجری های برتر حوزه ساخت و ساز آشنا شوید. در این صفحه می‌توانید پروفایل مجری های ما را مشاهده کنید و برای پروژه‌های خود از آنها مشاوره و خدمات دریافت کنید.",
  keywords: [
    "متخصصان ساختمانی",
    "مشاورین ساخت و ساز",
    "پیمانکاران حرفه‌ای",
    "متخصص ساخت و ساز",
    "خدمات ساختمانی",
    "پروژه‌های ساخت و ساز",
    "مشاوره پروژه ساختمانی",
  ],
  openGraph: {
    title: `مجری ها | ${nameSite}`,
    description:
      "با متخصصان برتر حوزه ساخت و ساز آشنا شوید. در این صفحه می‌توانید پروفایل متخصصان ما را مشاهده کنید و برای پروژه‌های خود از آنها مشاوره و خدمات دریافت کنید.",
    url: `${process.env.NEXT_PUBLIC_URL + "/experts"}`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_URL + "/about-us.jpg"}`,
        width: 800,
        height: 600,
        alt: `پروفایل متخصصان ${nameSite}`,
      },
    ],
    type: "website",
    locale: "fa_IR",
    siteName: "اساتید ساخت و ساز",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@buildMasters",
    site: "@buildMasters",
  },
  robots: "index, follow",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_URL + "/about-us"}`,
  },
};
export default async function page({
  searchParams,
}: {
  searchParams: FilterQueryType;
}) {
  const data: AllExpertType = await getData(searchParams);
  return (
    <>
      <Breadcrums />
      <div className="classDiv">
        <section className="flex items-center justify-between">
          <h1 className="font-semibold lg:text-xl dark:text-h-dark text-gray-800">
            {" "}
            مجریان
          </h1>
          <div className="w-1/3">
            <OrderSearch />
          </div>
        </section>
        <h2>تمام مجریان</h2>

        {data?.rows?.length ? (
          <div className="grid gap-4 md:gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-6">
            {data.rows.map((items, index) => (
              <CardExperts key={index} {...items} />
            ))}
          </div>
        ) : (
          <DontData name="هیچ مجری یافت نشد!" />
        )}
        <Suspense fallback={"در حال بارگیری ..."}>
          <Pagination pagination={data.paginate} />
        </Suspense>
      </div>
      <ContactSocialMedia />
    </>
  );
}
