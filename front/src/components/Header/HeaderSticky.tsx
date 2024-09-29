"use client";
import React, { Suspense, useEffect, useState } from "react";
import "./style.css";
import { IoIosArrowUp } from "react-icons/io";
import { MenuComType } from "@/app/type";
import Link from "next/link";
import { FaAngleDoubleDown, FaAngleLeft } from "react-icons/fa";
import DarkMode from "../DarkMode/DarkMode";
import SearchBox from "../SearchBox/SearchBox";
import Image from "next/image";
import { usePathname } from "next/navigation";
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
      },
      {
        name: "تست",
        url: "#",
      },
      {
        name: "چک",
        url: "#",
      },
      {
        name: "بازبینی",
        url: "#",
        child: [
          {
            name: "عمران",
            url: "#",
          },
          {
            name: "کناف",
            url: "#",
          },
        ],
      },
      {
        name: "توسعه",
        url: "#",
      },
    ],
  },
  {
    name: "تماس با ما",
    url: "/contact-us",
  },
  {
    name: "سوالات متدوال",
    url: "/faqs",
  },
  {
    name: "درباره ما",
    url: "/about-us",
  },
  {
    name: "گرفتن قیمت آنلاین",
    url: "/request-project",
  },
];
export default function HeaderSticky() {
  const [scroll, setScroll] = useState<Number>(0);
  const [visible, setVisible] = useState<boolean>(true);
  const [scrollTop, setScrollTop] = useState<boolean>(false);
  const query = usePathname();
  const MenuComponents = ({ props }: { props: MenuComType }) => {
    if (!props.length) return;
    return props.map((i, index) => (
      <li key={index}>
        <Link
          className="flex w-full justify-between items-center py-2 px-3"
          href={i.url}
        >
          {i.name}
          {i.child?.length ? (
            <i>
              <FaAngleLeft />
            </i>
          ) : null}
        </Link>
        {i.child?.length ? (
          <ul>
            <MenuComponents props={i.child} />
          </ul>
        ) : null}
      </li>
    ));
  };
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY as Number;
      const sizePage = document.body.scrollHeight;
      const scrollPage = window.scrollY + window.innerHeight;
      const mathLocation = Math.floor((scrollPage / sizePage) * 100);
      if (mathLocation > 80) {
        setScrollTop(true);
      } else {
        setScrollTop(false);
      }
      if (currentScroll > scroll) {
        setVisible(false);
      } else if (Number(currentScroll) < 65) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setScroll(currentScroll);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scroll]);

  return (
    <>
      <div
        className={`header-sticky shadow-md shadow-[#dbdbdb] dark:shadow-[#6c6c6c] bg-slate-100 dark:bg-gray-800 ${
          visible
            ? "header-show bg-slate-100/40 dark:!bg-gray-800/80"
            : "header-hidden"
        } `}
      >
        <div className="max-w-7xl w-full py-3 flex mx-auto">
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
                  <li
                    key={index}
                    className="flex items-center gap-2 group relative"
                  >
                    <Link
                      href={i.url}
                      className={`group-hover:text-blue-400 hover:scale-105 py-3 transition-all scale-1 flex items-center ${
                        i.url === query ? "text-blue-400" : ""
                      }`}
                    >
                      {i.name}
                    </Link>
                    {i.child ? (
                      <>
                        <ul>
                          <MenuComponents props={i.child} />
                        </ul>
                        <i>
                          <FaAngleDoubleDown
                            size={14}
                            className="group-hover:text-blue-400"
                          />
                        </i>
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
        </div>
      </div>
      <div
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
        className={`cursor-pointer fixed z-50 right-5 rounded-full shadow-md bg-slate-500/70 text-white p-3 transition-all ${
          scrollTop ? "bottom-5" : "-bottom-12"
        }`}
      >
        <i>
          <IoIosArrowUp />
        </i>
      </div>
    </>
  );
}
