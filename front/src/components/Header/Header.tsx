import React, { Suspense } from "react";
import IconSocialMedia from "../IconSocialMedia/IconSocialMedia";
import Link from "next/link";
import Image from "next/image";
import DarkMode from "../DarkMode/DarkMode";
import SearchBox from "../SearchBox/SearchBox";
import HeaderSticky from "./HeaderSticky";
import { MenuComType } from "@/app/type";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleDoubleDown } from "react-icons/fa";
const menuTitle = [
  {
    name: "خانه",
    url: "/",
  },
  {
    name: "وبلاگ",
    url: "/blog",
    child: [
      {
        name: "پروژه",
        url: "#",
      }, {
        name: "تست",
        url: "#",
      }, {
        name: "چک",
        url: "#",
      }, {
        name: "بازبینی",
        url: "#",
        child: [
          {
            name: "عمران",
            url: "#",
          }, {
            name: "کناف",
            url: "#",
          },
        ]
      }, {
        name: "توسعه",
        url: "#",
      },
    ]
  },
  {
    name: "تماس با ما",
    url: "contact-us",
  },
  {
    name: "سوالات متدوال",
    url: "/faqs",
  },
  {
    name: "درباره ما",
    url: "/about-us",
  }
];
export default function Header() {
  const MenuComponents = ({ props }: { props: MenuComType }) => {
    if (!props.length) return
    return props.map((i, index) => (
      <li key={index}>
        <Link
          className="flex w-full justify-between items-center py-2 px-3"
          href={i.url}
        >
          {i.name}
          {i.child?.length ? <i>
            <FaAngleLeft />
          </i>
            : null}
        </Link>
        {i.child?.length ? (
          <ul>
            <MenuComponents props={i.child} />
          </ul>
        ) : null}
      </li>
    ))
  }
  return (
    <>
      <div className="bg-slate-100 dark:bg-gray-800 pt-8">
        <div className="max-w-7xl w-full mx-auto">
          <div className="w-full flex justify-between">
            <div className="w-4/12 text-right">
              <IconSocialMedia />
            </div>
            <div className="w-8/12 text-center border-b pb-8">
              <ul className="flex gap-7 justify-center text-sm text-gray-900 dark:text-gray-100">
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
        </div>
      </div>
      <HeaderSticky>
        <div className="w-full flex justify-between">
          <div className="w-2/12 flex items-center">
            <DarkMode />
            <Suspense fallback={<div>loading...</div>}>
              <SearchBox />
            </Suspense>
          </div>
          <div className="w-8/12 flex items-center mt-1 menu-header">
            <ul className="flex justify-evenly text-slate-600 dark:text-gray-300 w-full">
              {menuTitle.map((i, index) => (
                <li key={index} className="flex items-center gap-2 group relative">
                  <Link
                    href={i.url}
                    className="group-hover:text-blue-400 hover:scale-105 py-3 transition-all scale-1 flex items-center"
                  >
                    {i.name}
                  </Link>
                  {i.child ? (
                    <>
                      <ul>
                        <MenuComponents props={i.child} />
                      </ul>
                      <i><FaAngleDoubleDown size={14} className="group-hover:text-blue-400" /></i>
                    </>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-2/12 flex items-center justify-end">
            <Link href={"/"}>
              <figure className="flex justify-end items-end">
                <Image
                  src={"/logo.png"}
                  width={70}
                  height={20}
                  alt="logo"
                  loading="eager"
                />
              </figure>
            </Link>
          </div>
        </div>
      </HeaderSticky>
    </>
  );
}
