import Breadcrums from "@/components/Breadcrums/Breadcrums";
import Link from "next/link";
import React from "react";
import { fetchApi } from "@/action/fetchApi";
import { FaqsType } from "../type";
import ContactSocialMedia from "@/components/ContactSocialMedia/ContactSocialMedia";
import NotFound from "../not-found";
import CustomButton from "@/components/CustomButton/CustomButton";
import { Metadata } from "next";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { IoIosArrowDown } from "react-icons/io";
import { dataApi } from "@/data/tagsName";
const getData = async () => {
  const data = await fetchApi({ url: dataApi.faqs.url, next:dataApi.faqs.cache, tags:dataApi.faqs.tags });
  if (data.error) return NotFound();
  return data
};
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || "http://localhost:3000"),
  title: 'سوالات متداول | ساخت یار',
  description: 'در این صفحه به سوالات متداول کاربران درباره خدمات ساخت و ساز، پیمانکاری، و مشاوره پروژه‌های ساختمانی پاسخ داده‌ایم. به راحتی اطلاعات مورد نظر خود را پیدا کنید.',
  keywords: [
    'سوالات متداول',
    'پاسخ به سوالات رایج',
    'خدمات ساخت و ساز',
    'مشاوره ساختمانی',
    'پیمانکاری',
    'پروژه‌های ساخت و ساز',
    'ساخت و ساز سوالات',
  ],
  openGraph: {
    title: 'سوالات متداول | ساخت یار',
    description: 'در این بخش از سایت، به سوالات متداول شما درباره خدمات ساخت و ساز، مشاوره، پیمانکاری و پروژه‌های ساختمانی پاسخ داده‌ایم.',
    url: `${process.env.NEXT_PUBLIC_URL + "/faq"}`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_URL + "/about-us.jpg"}`,
        width: 800,
        height: 600,
        alt: 'سوالات متداول سایت ساخت یار',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'سوالات متداول | ساخت یار',
    description: 'پاسخ به سوالات متداول کاربران درباره خدمات ساخت و ساز و پروژه‌های ساختمانی.',
    images: [`${process.env.NEXT_PUBLIC_URL + "/about-us.jpg"}`],
  },
  robots: "index, follow",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_URL + "/faq"}`,
  },
};
export default async function page() {
  const { data }: FaqsType = await getData();
  return (
    <>
      <Breadcrums />
      <div className="classDiv flex-col flex md:flex-row gap-3">
        <div className="w-full md:w-3/4">
          <section className="mb-3 md:mb-4">
            <h1 className="lg:text-xl text-base mb-1 md:mb-2 font-semibold dark:text-h-dark"> سوالات متدوال:</h1>
            <span className="text-xs lg:text-base text-gray-700 dark:text-s-dark">{data?.text?.title}</span>
          </section>
          <div className="accordion flex flex-col gap-5 lg:gap-7">
            {data?.text?.accordion.length
              ? data?.text.accordion.map((i, index) => (
                <div key={i?.id}>
                  <span className="lg:text-xl text-gray-900 mr-3 mb-1 block dark:text-p-dark">
                    {i?.name}
                  </span>
                  <section className="flex flex-col gap-1">
                    {i?.arry.length
                      ? i.arry.map((item) => (
                        <Accordion key={index}>
                          <AccordionSummary
                            expandIcon={<IoIosArrowDown />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                          >
                            <span className="text-sm lg:text-base text-gray-800 dark:text-p-dark">
                              {item?.name}
                            </span>
                          </AccordionSummary>
                          <AccordionDetails>
                            <p className="text-xs lg:text-base text-gray-700 dark:text-s-dark">
                              {item?.text}
                            </p>
                          </AccordionDetails>
                        </Accordion>
                      ))
                      : null}
                  </section>
                </div>
              ))
              : null}
          </div>
        </div>
        <div className="w-full md:w-1/4">
          <section className="w-full bg-gradient-to-bl from-[#60a5fa] dark:shadow-full-dark dark:from-[#363e4a] dark:to-[#1b1b1f]  shadow-md to-slate-200 rounded-md p-3 sticky top-24 left-0 min-h-12">
            <h2 className="text-white text-xl mb-4 dark:text-p-dark lg:text-xl  font-semibold ">درباره ما</h2>
            <p className="text-justify !leading-7 dark:text-p-dark text-gray-600 textsm lg:text-base">
              {data?.text?.description}
            </p>
            <Link href={"/about-us"} className="w-1/2 block mx-auto mt-3">
              <CustomButton name="مطالعه بیشتر..." type="button" color="blue" />
            </Link>
          </section>
        </div>
      </div>
      <ContactSocialMedia />
    </>
  );
}
