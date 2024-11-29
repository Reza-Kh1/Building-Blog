import { fetchApi } from "@/action/fetchApi";
import Breadcrums from "@/components/Breadcrums/Breadcrums";
import Cards from "@/components/Cards/Cards";
import OrderSearch from "@/components/OrderSearch/OrderSearch";
import Pagination from "@/components/Pagination/Pagination";
import React, { Suspense } from "react";
import { AllPostType, FilterQueryType } from "../type";
import ContactSocialMedia from "@/components/ContactSocialMedia/ContactSocialMedia";
import { Metadata } from "next";
import { dataApi } from "@/data/tagsName";
import DontData from "@/components/DontData/DontData";
import { notFound } from "next/navigation";
const nameSite = process.env.NEXT_PUBLIC_NAME_SITE || ""
const getData = async (query: FilterQueryType) => {
  const url = "post?" + new URLSearchParams(query);
  const data = await fetchApi({ url, next: dataApi.posts.cache, tags: dataApi.posts.tags });
  if (data.error) return notFound();
  return data;
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || "http://localhost:3000"),
  title: `وبلاگ | ${nameSite}`,
  description:
    "ما برای افزایش آگاهی شما مقالاتی را نوشتیم که میتواند در انتخاب هاتون بهتون کمک کند.",
  keywords: [
    "پروژه‌های ساختمانی",
    "مشاوره ساخت‌وساز",
    "خدمات پیمانکاری",
    nameSite
  ],
  openGraph: {
    type: 'website',
    siteName:nameSite,
    locale:"fa_IR",
    title: `وبلاگ | ${nameSite}`,
    description:
      "ما برای افزایش آگاهی شما مقالاتی را نوشتیم که میتواند در انتخاب هاتون بهتون کمک کند.",
    url: `${process.env.NEXT_PUBLIC_URL + "/blog"}`,
    images: [
      {
        url: "/category.jpg",
        width: 600,
        height: 350,
        alt: `صفحه وبلاگ سایت ${nameSite}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator:"@buildMasters",
    site:"@buildMasters"
  },
  robots: "index, follow",
  alternates: {
    canonical:"/blog",
  },
};
export default async function page({
  searchParams,
}: {
  searchParams: FilterQueryType;
}) {
  const data: AllPostType = await getData(searchParams);
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
          {
            data.rows.length ?
              <Cards props={data.rows} />
              :
              <DontData name="هیچ پستی یافت نشد!" />
          }
        </div>
        <Suspense fallback={"در حال بارگیری ..."}>
          <Pagination pagination={data.paginate} />
        </Suspense>
      </div>
      <ContactSocialMedia />
    </>
  );
}
