import Link from "next/link";
import React from "react";
import { FaInstagram, FaPhone, FaTelegram } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import "./style.css";
const data = [
  {
    title: "تلگرام",
    icon: <FaTelegram className="text-xl lg:text-3xl" />,
    url: "https://telegram.me/Reza_kh666",
    span: "Reza_kh666@",
  },
  {
    title: "تماس با ما",
    icon: <FaPhone className="text-xl lg:text-3xl" />,
    url: "tel:09390199977",
    span: "09390199977",
  },
  {
    title: "اینستاگرام",
    icon: <FaInstagram className="text-xl lg:text-3xl" />,
    url: "instagram.com/_u/Reza_kha.ni",
    span: "Reza_kha.ni",
  },
  {
    title: "ایمیل",
    icon: <MdEmail className="text-xl lg:text-3xl" />,
    url: "mailto:r.khani1385.66@gmail.com",
    span: "R.khani1385.66@gmail.com",
  },
];
export default function ContactSocialMedia({
  classDiv,
}: {
  classDiv?: string;
}) {
  return (
    <div
      className={
        "grid grid-cols-4 px-4 overflow-auto my-6 lg:my-12 gap-2 justify-center lg:gap-5 w-full max-w-7xl mx-auto pt-6 lg:pt-12 " +
        classDiv
      }
    >
      {data.map((i, index) => (
        <div
          key={index}
          className="border shadow-md rounded-md text-center p-3 flex flex-col gap-1 lg:gap-3 relative pt-6 lg:pt-12"
        >
          <Link
            href={i.url}
            className="absolute link-contact-us text-blue-400 bg-white rounded-full p-2 lg:p-4 hover:text-white hover:bg-gradient-to-tl hover:to-blue-400 hover:from-slate-300 left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2"
          >
            {i.icon}
          </Link>
          <span className="text-xs lg:text-xl">{i.title}</span>
          <div className="overflow-auto">
            <span className="text-[8px]  lg:text-base text-gray-500">{i.span}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
