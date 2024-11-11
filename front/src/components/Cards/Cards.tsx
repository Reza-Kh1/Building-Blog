import React from "react";
import ImgTag from "../ImgTag/ImgTag";
import Link from "next/link";
import { FaAngleLeft, FaCalendarDays, FaComments } from "react-icons/fa6";
import { FaPhotoVideo } from "react-icons/fa";
import { CardPostType } from "@/app/type";
export default function Cards({ props }: { props: CardPostType[] }) {
  if (!props?.length) return
  return props.map((i, index) => (
    <Link
      href={`/post/${i.title.replace(/ /g,"-")}`} key={index}
      className="card-box w-full group max-w-7xl flex gap-5 my-2 lg:my-3 hover:bg-[#f1f9ff] hover:shadow-lg p-1 lg:p-3 rounded-md transition-all"
    >
      <div className="w-2/5 lg:w-1/3 order-1">
        <ImgTag alt={i.title} height={200} src={i.image} width={450} className="w-44 md:w-80 md:h-56 lg:w-[450px] lg:h-56 h-36 object-cover"/>
      </div>
      <div className="w-3/5 lg:w-2/3 order-2 flex justify-evenly md:justify-between flex-col md:py-2 gap-1">
        <span className="text-xs lg:text-sm text-gray-500">{i?.Category?.name}</span>
        <h3 className="text-sm lg:text-lg text-gray-800">{i.title}</h3>
        <div className="flex gap-1 text-xs md:text-base lg:gap-5 text-gray-500">
          <i>
            <FaPhotoVideo />
          </i>
          |
          <p className="flex gap-2">
            <span>{i.totalComments}</span>
            <i>
              <FaComments />
            </i>
          </p>
          |
          <p className="flex gap-2">
            <span>{new Date(i.updatedAt).toLocaleDateString("fa")}</span>
            <i>
              <FaCalendarDays />
            </i>
          </p>
        </div>
        <p className="text-xs lg:text-sm text-gray-700 cutline cutline-3 text-justify">
          {i.description}</p>
        <div className="hidden md:!block">
          <button type="button" title="button" className="p-[6px] text-xs md:text-base lg:p-2 custom-button-card relative flex items-center bg-gradient-to-b from-blue-400/70 to-blue-500 rounded-full group-hover:from-blue-500/70 shadow-md  group-hover:to-blue-600/90 text-white">
            <span className="group-hover:block ">مشاهده مقاله</span>
            <i>
              <FaAngleLeft />
            </i>
          </button>
        </div>
      </div>
    </Link>)
  );
}
