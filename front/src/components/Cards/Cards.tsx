import React from "react";
import ImgTag from "../ImgTag/ImgTag";
import Link from "next/link";
import { FaAngleLeft, FaCalendarDays, FaComments } from "react-icons/fa6";
import { FaPhotoVideo } from "react-icons/fa";
import "./style.css";
import { CardPostType } from "@/app/type";
export default function Cards({ props }: { props: CardPostType[] }) {
  if (!props?.length) return
  return props.map((i, index) => (
    <Link
      href={`/post/${i.title.replace(/ /g,"-")}`} key={index}
      className="card-box w-full group max-w-7xl flex gap-5 hover:bg-[#f1f9ff] hover:shadow-lg p-3 rounded-md transition-all"
    >
      <div className="w-1/3">
        <ImgTag alt={i.title} height={200} src={i.image} width={450} />
      </div>
      <div className="w-2/3 flex justify-between flex-col py-2">
        <span className="text-sm">{i?.Category?.name}</span>
        <h4 className="text-lg">{i.title}</h4>
        <div className="flex gap-5">
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
        <p className="text-sm">{i.description}</p>
        <div>
          <button type="button" title="button" className="custom-button-card relative flex items-center bg-gradient-to-b from-blue-400/70 to-blue-500 rounded-full group-hover:from-blue-500/70 shadow-md  group-hover:to-blue-600/90 p-2  text-white">
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
