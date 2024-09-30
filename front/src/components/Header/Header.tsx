import React, { Suspense } from "react";
import IconSocialMedia from "../IconSocialMedia/IconSocialMedia";
import Link from "next/link";
import HeaderSticky from "./HeaderSticky";
import NavlinkHeader from "./NavlinkHeader";

export default function Header() {
  return (
    <>
      <div className="bg-slate-100 dark:bg-slate-700 transition-all pt-8">
        <div className="max-w-7xl w-full mx-auto">
          <div className="w-full flex justify-between">
            <div className="w-4/12 text-right">
              <IconSocialMedia />
            </div>
            <div className="w-8/12 text-center border-b pb-8">
              <ul className="flex gap-7 justify-center text-sm text-gray-900 dark:text-gray-100">
                <li className="hover:text-blue-400">
                  <NavlinkHeader title="درباره ما" url="/about-us" />
                </li>
                <li className="hover:text-blue-400">
                  <NavlinkHeader title="سوالات متداول" url="/faqs" />
                </li>
                <li className="hover:text-blue-400">
                  <NavlinkHeader title="خانه" url="/" />
                </li>
              </ul>
            </div>
            <div className="w-4/12 text-left">test</div>
          </div>
        </div>
      </div >
      <Suspense fallback={<div>Loading...</div>}>
        <HeaderSticky />
      </Suspense>
    </>
  );
}
