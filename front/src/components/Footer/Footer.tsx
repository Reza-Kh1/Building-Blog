import React from "react";
import "./style.css";
import Image from "next/image";
import {
  FaAngleLeft,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
const menuTitle = [
  "خانه",
  "ارتباط با ما",
  "تماس با ما",
  "سوالات متداول",
  "وبلاگ",
  "گالری",
];
const iconFooter = [
  { icon: <FaTelegramPlane />, color: "#437dff" },
  { icon: <FaInstagram />, color: "#e23e7e" },
  { icon: <FaLinkedin />, color: "#98c7ff" },
  { icon: <FaWhatsapp />, color: "#3ee280" },
];
export default function Footer() {
  return (
    <div>
      <span className="w-full py-2 bg-slate-700"></span>
      <div className="bg-footer">
        <div className="w-4/5 mx-auto flex items-center py-10">
          <div className="w-3/5">
            <div className="border-b border-b-slate-700 mb-5 pb-5 flex items-stretch gap-5 text-slate-400">
              <figure className="flex">
                <Image alt="logo" src={"/logo.png"} width={200} height={100} />
              </figure>
              <span className="border border-slate-500"></span>
              <p className="text-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis molestiae est eligendi rerum deserunt officia, porro
                obcaecati totam omnis id! Iure consectetur accusamus eos magnam
                ipsa distinctio quis ratione ex.
              </p>
            </div>
            <div className="flex justify-between">
              <ul className="flex flex-col gap-2 text-slate-400">
                {menuTitle.map((i, index) => (
                  <li key={index} className="flex">
                    <a
                      href="#"
                      className="hover:text-slate-100 transition-shadow flex items-center"
                    >
                      <i>
                        <FaAngleLeft />
                      </i>
                      <span className="mr-1 transition-shadow">{i}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <ul className="flex flex-col gap-2 text-slate-400">
                {menuTitle.map((i, index) => (
                  <li key={index} className="flex">
                    <a
                      href="#"
                      className="hover:text-slate-100 transition-shadow flex items-center"
                    >
                      <i>
                        <FaAngleLeft />
                      </i>
                      <span className="mr-1 transition-shadow">{i}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <ul className="flex flex-col gap-2 text-slate-400">
                {menuTitle.map((i, index) => (
                  <li key={index} className="flex">
                    <a
                      href="#"
                      className="hover:text-slate-100 transition-shadow flex items-center"
                    >
                      <i>
                        <FaAngleLeft />
                      </i>
                      <span className="mr-1 transition-shadow">{i}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-2/5 pr-7">
            <form className="border relative bg-[#1a1b1c8c] rounded-md overflow-hidden">
              <i className="absolute right-0 top-1/2 flex items-center text-xl translate-x-0 border-l  h-full w-auto px-2  -translate-y-1/2">
                <FaTelegramPlane color="white"/>
              </i>
              <input placeholder="ایمیل خود را وارد کنید" className="input-subscribe pr-11 py-2" type="text" />
              <button className="absolute left-0 top-1/2 translate-x-0 h-full bg-slate-50 w-auto px-5 -translate-y-1/2">عضویت</button>
            </form>
          </div>
        </div>
        <div className="after-overlay py-10">
          <div className="w-4/5 relative z-10 mx-auto gap-7 flex flex-col">
            <div className="flex items-center justify-between">
              <ul className="flex gap-3 text-p-light text-sm dark:text-p-dark">
                {menuTitle.map((i, index) => (
                  <li key={index}>
                    <a
                      href="/"
                      className="hover:text-white ml-2 transition-all"
                    >
                      {i}
                    </a>
                    {menuTitle.length === index + 1 ? null : <span>/</span>}
                  </li>
                ))}
              </ul>
              <ul className="flex gap-5 text-stone-100 text-2xl">
                {iconFooter.map((i, index) => (
                  <li key={index} className="relative">
                    <a
                      href="#"
                      className={`border-icon-footer hover:text-[${i.color}] transition-all after:border-[${i.color}] after:border`}
                    >
                      {i.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-1/3 text-slate-500 mx-auto text-center">
              <p>©️ کلیه حقوق این سایت متعلق به invetion است .</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
