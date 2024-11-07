import Breadcrums from "@/components/Breadcrums/Breadcrums";
import Link from "next/link";
import React from "react";
import AccordionFaqs from "./AccordionFaqs";
import { fetchApi } from "@/action/fetchApi";
import { FaqsType } from "../type";
import ContactSocialMedia from "@/components/ContactSocialMedia/ContactSocialMedia";
import NotFound from "../not-found";
const getData = async () => {
  const data = await fetchApi({ url: "page/faqs" });
  if (data.error) return NotFound();
  return data
};
export default async function page() {
  const { data }: FaqsType = await getData();
  return (
    <div className="faqs-page w-full my-6">
      <Breadcrums className="mb-5" />
      <div className="flex w-full gap-3 max-w-7xl mx-auto">
        <div className="w-3/4">
          <div className="mb-4">
            <h1 className="text-xl font-semibold"> سوالات شما:</h1>
            <span className="text-sm">{data?.text?.title}</span>
          </div>
          <div className="accordion flex flex-col gap-7">
            {data?.text?.accordion.length
              ? data?.text.accordion.map((i, index) => (
                <div key={i?.id}>
                  <span className="font-medium text-xl text-gray-900 mr-3 mb-1 block">
                    {i?.name}
                  </span>
                  {i?.arry.length
                    ? i.arry.map((item) => (
                      <AccordionFaqs {...item} key={index} />
                    ))
                    : null}
                </div>
              ))
              : null}
          </div>
        </div>
        <div className="w-1/4">
          <div className="w-full bg-gray-800 rounded-md p-3">
            <h2 className="text-white text-xl font-medium mb-5">درباره ما</h2>
            <p className="text-gray-200 text-justify leading-7">
              {data?.text?.description}
            </p>
            <Link href={"/about-us"}>
              <button
                type="button"
                className="bg-green-600 font-medium text-white p-2 rounded px-4 text-sm mt-5 shadow-md after:bottom-0 after:bg-green-700/50 after:w-full after:h-1 after:left-0 relative after:absolute after:rounded-xl"
              >
                مطالعه بیشتر
              </button>
            </Link>
          </div>
        </div>
      </div>
      <ContactSocialMedia />
    </div>
  );
}
