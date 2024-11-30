import React, { Suspense } from "react";
import IconSocialMedia from "../IconSocialMedia/IconSocialMedia";
import HeaderSticky from "./HeaderSticky";
import NavlinkHeader from "./NavlinkHeader";
import { fetchApi } from "@/action/fetchApi";
import { CategoryType } from "@/app/type";
import { dataApi } from "@/data/tagsName";
import "./style.css";
const getData = () => {
  return fetchApi({ url: dataApi.header.url, next: dataApi.header.cache, tags: dataApi.header.tags })
}
export default async function Header() {
  const data: CategoryType[] = await getData()
  return (
    <>
      <header className="w-full h-full">
        <div className="bg-slate-100/80 dark:bg-zinc-900 transition-all pt-2 md:pt-8">
          <div className="classDiv !my-0 flex w-full flex-wrap px-3 xl:px-0 md:flex-row justify-between items-center md:items-start">
            <div className="w-1/2 order-1 md:order-1 md:w-2/12 text-right text-xs md:text-base font-bold">اساتید ساخت و ساز</div>
            <nav className="w-full my-6 md:my-0 order-3 pt-4 md:pt-0 dark:border-bg-dark md:order-2 md:w-8/12 text-center border-b pb-4 md:pb-8">
              <ul className="flex gap-4 md:gap-7 justify-center text-sm text-gray-700 dark:text-p-dark">
                <li className="hover:text-blue-400 text-xs md:text-base">
                  <NavlinkHeader title="درباره ما" url="/about-us" />
                </li>
                <li className="hover:text-blue-400 text-xs md:text-base">
                  <NavlinkHeader title="صفحه اصلی" url="/" />
                </li>
                <li className="hover:text-blue-400 text-xs md:text-base">
                  <NavlinkHeader title="سوالات متداول" url="/faqs" />
                </li>
              </ul>
            </nav>
            <div className="w-1/2 order-2 md:order-3 md:w-2/12 text-left" dir="ltr">
              <IconSocialMedia />
            </div>
          </div>
        </div >
      </header>
      <Suspense fallback={<div>Loading...</div>}>
        <HeaderSticky category={data} />
      </Suspense>
    </>
  );
}
