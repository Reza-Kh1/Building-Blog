"use client";
import React, { useEffect, useState } from "react";
import "./style.css";
export default function HeaderSticky({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scroll, setScroll] = useState<Number>(0);
  const [visible, setVisible] = useState<boolean>(true);
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY as Number;
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
    <div
      className={`header-sticky shadow-md shadow-[#dbdbdb] dark:shadow-[#6c6c6c] bg-slate-100 dark:bg-gray-800 ${
        visible
          ? "header-show bg-slate-100/40 dark:!bg-gray-800/80"
          : "header-hidden"
      } `}
    >
      <div className="max-w-7xl w-full py-3 flex mx-auto">{children}</div>
    </div>
  );
}
