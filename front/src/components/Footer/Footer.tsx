import React from "react";
import Image from "next/image";
import SubscribeForm from "./SubscribeForm";
import { FiPhoneCall } from "react-icons/fi";
import Link from "next/link";
import IconSocialMedia from "../IconSocialMedia/IconSocialMedia";
import { FaAngleLeft } from "react-icons/fa";
const getData = () => {
  return fetchApi({ url: "page/footer" });
};
const menuTitle = [
  "خانه",
  "ارتباط با ما",
  "تماس با ما",
  "سوالات متداول",
  "وبلاگ",
  "گالری",
];
import "./style.css";
import { fetchApi } from "@/action/fetchApi";
import { Footertype } from "@/app/type";
export default async function Footer() {
  const { data }: Footertype = await getData();
  return (
    <div>
      <span className="w-full bg-slate-700"></span>
      <div className="bg-footer">
        <div className="w-4/5 mx-auto flex items-center py-10">
          <div className="w-3/5">
            <div className="border-b border-b-slate-700 mb-5 pb-5 flex items-stretch gap-5 text-slate-400">
              <figure className="flex">
                <Image
                  alt={data?.text?.logoUrl?.alt || "logo"}
                  src={data?.text?.logoUrl?.url || "/logo.png"}
                  width={200}
                  className="rounded-md shadow-md"
                  height={100}
                  loading="lazy"
                />
              </figure>
              <span className="border border-slate-500"></span>
              <p className="text-justify">{data?.text?.text}</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {data?.text?.menuLink.length
                ? data.text.menuLink.map((i, index) => (
                    <ul
                      key={index}
                      className="flex flex-col gap-2 text-slate-400"
                    >
                      {i.length
                        ? i.map((item) => (
                            <li
                              key={item.id}
                              className="flex hover:pr-1 transition-all"
                            >
                              <Link
                                href={item.link}
                                className="hover:text-slate-100 transition-all scale-1 flex items-center"
                              >
                                <i>
                                  <FaAngleLeft />
                                </i>
                                <span className="mr-1 transition-shadow">
                                  {item.name}
                                </span>
                              </Link>
                            </li>
                          ))
                        : null}
                    </ul>
                  ))
                : null}
            </div>
          </div>
          <div className="w-2/5 pr-7">
            <div className=" flex flex-col gap-2 mb-5">
              <h3 className="text-slate-400 mb-3">
                هرگونه سوال یا مشاوره ای خواستید ما به صورت رایگان در خدمتیم می
                توانید با شماره های زیر تماس حاصل کنید :
              </h3>
              <address className="text-slate-400 text-sm">
                آدرس : تهران - فرحزاد - میدان فرحزاد - خیابان گلستان - بن بست
                لاله یکم - پلاک 13
              </address>
              <p className="text-slate-400 text-sm">
                ایمیل :{" "}
                <Link
                  href="mailto:R.khani1385.66@gmail.com"
                  className="hover:text-blue-400"
                >
                  R.khani1385.66@gmail.com
                </Link>
              </p>
              <p className="text-slate-400 text-sm">
                تلفن :{" "}
                <Link href="tel:02122087279" className="hover:text-blue-400">
                  22087279-021
                </Link>
              </p>
              <div className="text-blue-100 mt-3 flex justify-between items-center text-sm">
                <Link
                  href="tel:09390199977"
                  className="bg-[#1c2124] hover:bg-gray-950 items-center gap-2 p-2 flex rounded-md shadow-custom-dark"
                >
                  09390199977
                  <i>
                    <FiPhoneCall color="green" />
                  </i>
                </Link>
                <Link
                  href="tel:09226115716"
                  className="bg-[#1c2124] hover:bg-gray-950 items-center gap-2 p-2 flex rounded-md shadow-custom-dark"
                >
                  09226115716
                  <i>
                    <FiPhoneCall color="green" />
                  </i>
                </Link>
              </div>
            </div>
            {/* <div>
              <p className="text-slate-400 mb-2">در خبرنامه ما عضو شوید.</p>
              <SubscribeForm />
            </div> */}
          </div>
        </div>
        <div className="after-overlay py-8">
          <div className="w-4/5 relative z-10 mx-auto gap-7 flex flex-col">
            <div className="flex items-center justify-between">
              <ul className="flex gap-3 text-gray-500 text-sm ">
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
              <div className="text-2xl">
                <IconSocialMedia />
              </div>
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
