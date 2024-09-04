import React from "react";
import IconSocialMedia from "../IconSocialMedia/IconSocialMedia";
import Link from "next/link";
import Image from "next/image";
import DarkMode from "../DarkMode/DarkMode";
import SearchBox from "../SearchBox/SearchBox";
const menuTitle = [
  "خانه",
  "ارتباط با ما",
  "تماس با ما",
  "سوالات متداول",
  "وبلاگ",
  "گالری",
];
export default function Header() {
  return (
    <div className="bg-slate-100 dark:bg-gray-800">
      <div className="max-w-7xl w-full py-5 mx-auto">
        <div className="w-full flex justify-between">
          <div className="w-4/12 text-right">
            <IconSocialMedia />
          </div>
          <div className="w-8/12 text-center border-b pb-5">
            <ul className="flex gap-7 justify-center text-sm">
              <li className="hover:text-blue-400">
                <Link href={"#"}>ارتباط با ما</Link>
              </li>
              <li className="hover:text-blue-400">
                <Link href={"#"}>سوالات متداول</Link>
              </li>
              <li className="hover:text-blue-400">
                <Link href={"#"}>خانه</Link>
              </li>
            </ul>
          </div>
          <div className="w-4/12 text-left">test</div>
        </div>
        <div className="w-full flex justify-between pt-3">
          <div className="w-4/12 flex items-center">
            <DarkMode />
            <SearchBox />
          </div>
          <div className="w-8/12 flex items-center">
            <ul className="flex justify-evenly text-slate-600 w-full">
              {menuTitle.map((i, index) => (
                <li key={index} className="flex">
                  <Link
                    href="#"
                    className="hover:text-blue-400 hover:scale-105 transition-all scale-1 flex items-center"
                  >
                    {i}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-4/12 flex items-center justify-end">
            <figure className="flex justify-end items-end">
              <Image src={"/logo.png"} width={70} height={20} alt="logo" />
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
}
