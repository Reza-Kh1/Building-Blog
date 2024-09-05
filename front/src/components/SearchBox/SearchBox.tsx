"use client";
import React, { useEffect, useRef, useState } from "react";

import { BsSearch } from "react-icons/bs";
import { MdClose } from "react-icons/md";

export default function SearchBox() {
  const [isShow, setIsShow] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (isShow && ref.current) {
      ref.current.focus();
    }
  }, [isShow]);
  return (
    <div className="mr-3 text-gray-800 dark:text-gray-300 ">
      <i
        onClick={() => {
          setIsShow(true);
        }}
        className="cursor-pointer"
      >
        <BsSearch size={22} />
      </i>
        <div className={`w-full fixed ${isShow ? "right-0 top-10 opacity-100": "right-0 opacity-0 -top-20"} transition-all z-20`}>
          <div className="max-w-7xl shadow-lg rounded-xl p-3 mx-auto flex justify-between bg-gray-300 dark:bg-gray-600 items-center">
            <input
              ref={ref}
              type="text"
              className="w-11/12 p-3 bg-transparent border-b focus-visible:outline-none"
              placeholder="متن خود را بنویسید..."
            />
            <i onClick={() => setIsShow(false)} className="cursor-pointer">
              <MdClose size={25} />
            </i>
          </div>
        </div>
    </div>
  );
}
