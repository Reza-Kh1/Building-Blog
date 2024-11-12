import Breadcrums from "@/components/Breadcrums/Breadcrums";
import Link from "next/link";
import React from "react";
import AccordionFaqs from "./AccordionFaqs";
import { fetchApi } from "@/action/fetchApi";
import { FaqsType } from "../type";
import ContactSocialMedia from "@/components/ContactSocialMedia/ContactSocialMedia";
import NotFound from "../not-found";
import CustomButton from "@/components/CustomButton/CustomButton";
const getData = async () => {
  const data = await fetchApi({ url: "page/faqs" });
  if (data.error) return NotFound();
  return data
};
export default async function page() {
  const { data }: FaqsType = await getData();
  return (
    <div className="faqs-page">
      <Breadcrums />
      <div className="classDiv flex-col flex md:flex-row gap-3">
        <div className="w-full md:w-3/4">
          <div className="mb-3 md:mb-4">
            <h1 className="lg:text-xl text-base mb-1 md:mb-2 font-semibold dark:text-h-dark"> سوالات متدوال:</h1>
            <span className="text-xs lg:text-base text-gray-700 dark:text-s-dark">{data?.text?.title}</span>
          </div>
          <div className="accordion flex flex-col gap-5 lg:gap-7">
            {data?.text?.accordion.length
              ? data?.text.accordion.map((i, index) => (
                <div key={i?.id}>
                  <span className="lg:text-xl text-gray-900 mr-3 mb-1 block dark:text-p-dark">
                    {i?.name}
                  </span>
                  <div className="flex flex-col gap-1">
                    {i?.arry.length
                      ? i.arry.map((item) => (
                        <AccordionFaqs {...item} key={index} />
                      ))
                      : null}
                  </div>
                </div>
              ))
              : null}
          </div>
        </div>
        <div className="w-full md:w-1/4">
          <div className="w-full bg-gradient-to-bl from-[#60a5fa] dark:shadow-full-dark dark:from-[#363e4a] dark:to-[#1b1b1f]  shadow-md to-slate-200 rounded-md p-3 sticky top-24 left-0 min-h-12">
            <h2 className="text-white text-xl mb-4 dark:text-p-dark lg:text-xl  font-semibold ">درباره ما</h2>
            <p className="text-justify !leading-7 dark:text-p-dark text-gray-600 textsm lg:text-base">
              {data?.text?.description}
            </p>
            <Link href={"/about-us"} className="w-1/2 block mx-auto mt-3">
              <CustomButton name="مطالعه بیشتر..." type="button" color="blue" />
            </Link>
          </div>
        </div>
      </div>
      <ContactSocialMedia />
    </div>
  );
}
