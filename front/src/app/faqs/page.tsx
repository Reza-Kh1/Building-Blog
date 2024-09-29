import Breadcrums from "@/components/Breadcrums/Breadcrums";
import Link from "next/link";
import React from "react";
import AccordionFaqs from "./AccordionFaqs";

export default function page() {
  return (
    <div className="faqs-page w-full my-6">
      <div className="w-full mb-5 max-w-7xl mx-auto">
        <Breadcrums />
      </div>
      <div className="flex w-full gap-3 max-w-7xl mx-auto">
        <div className="w-3/4">
          <div className="mb-4">
            <h1 className="text-xl font-semibold">برخی از سوالات شما :</h1>
            <span className="text-sm">
              ما در اینجا آمده ایم صفحه ای رو تهیه کردیم که بیشتر سوالات شمارو
              پاسخ داده باشد و بتواند بهتون کمک کند تا سریع تر به پاسختون برسید.
            </span>
          </div>
          <div className="accordion flex flex-col gap-7">
            <div>
              <span className="font-medium text-xl text-gray-900 mr-3 mb-1 block">کناف</span>
              <AccordionFaqs />
            </div>
            <div>
              <span className="font-medium text-xl text-gray-900 mr-3 mb-1 block">لوله کشی</span>
              <AccordionFaqs />
            </div>
            <div>
              <span className="font-medium text-xl text-gray-900 mr-3 mb-1 block">تعیین قیمت</span>
              <AccordionFaqs />
            </div>
            <div>
              <span className="font-medium text-xl text-gray-900 mr-3 mb-1 block">مصالح</span>
              <AccordionFaqs />
            </div>
            <div>
              <span className="font-medium text-xl text-gray-900 mr-3 mb-1 block">نقشه کشی</span>
              <AccordionFaqs />
            </div>
            <div>
              <span className="font-medium text-xl text-gray-900 mr-3 mb-1 block">شهرداری</span>
              <AccordionFaqs />
            </div>
          </div>
        </div>
        <div className="w-1/4">
          <div className="w-full bg-gray-800 rounded-md p-3">
            <h2 className="text-white text-xl font-medium mb-5">درباره ما</h2>
            <p className="text-gray-200 text-justify leading-7">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab magni
              saepe, quam dolore, unde commodi fugit voluptatibus excepturi
              tenetur delectus iusto, aut porro qui earum magnam, doloribus
              nostrum laborum sed laudantium incidunt. Provident incidunt odio,
              labore magni, unde quam modi.
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
    </div>
  );
}
