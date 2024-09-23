"use client";
import React, { useEffect, useState } from "react";
import "./style.css";
import { IoIosArrowUp } from "react-icons/io";
export default function HeaderSticky({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scroll, setScroll] = useState<Number>(0);
  const [visible, setVisible] = useState<boolean>(true);
  const [scrollTop, setScrollTop] = useState<boolean>(false)
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY as Number;
      const sizePage = document.body.scrollHeight
      const scrollPage = window.scrollY + window.innerHeight
      const mathLocation = Math.floor((scrollPage / sizePage) * 100)
      if (mathLocation > 80) {
        setScrollTop(true)
      } else {
        setScrollTop(false)
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
        className={`header-sticky shadow-md shadow-[#dbdbdb] dark:shadow-[#6c6c6c] bg-slate-100 dark:bg-gray-800 ${visible
          ? "header-show bg-slate-100/40 dark:!bg-gray-800/80"
          : "header-hidden"
          } `}
      >
        <div className="max-w-7xl w-full py-3 flex mx-auto">{children}</div>
      </div>
      <div
        onClick={() => window.scrollTo({
          top: 0,
          behavior: "smooth"
        })}
        className={`cursor-pointer fixed z-50 right-5 rounded-full shadow-md bg-slate-500/70 text-white p-3 transition-all ${scrollTop ? "bottom-5" : "-bottom-12"}`}>
        <i>
          <IoIosArrowUp />
        </i>
      </div >
    </>
  );
}
