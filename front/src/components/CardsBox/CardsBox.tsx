import React from "react";
import ImgTag from "../ImgTag/ImgTag";
import Link from "next/link";
import { FaCalendarDay, FaCalendarDays, FaComments } from "react-icons/fa6";
import { FaAngleLeft, FaPhotoVideo } from "react-icons/fa";
import "./style.css";
const test = {
  id: 4,
  name: "test",
  title: "as",
  image:
    "https://building-blog.storage.iran.liara.space/1718433007077-Screenshot 2024-06-11 091827.png",
  slug: "as",
  description: "as",
  totalComments: null,
  updatedAt: "2024-06-21T15:12:12.498Z",
};
export default function CardsBox() {
  return (
    <Link
      href={"#"}
      className="cards-box flex w-full hover:bg-[#eaf1f7] hover:shadow-md p-3 rounded-md transition-all max-w-7xl gap-5 items-stretch"
    >
      <div className="w-1/3">
        <ImgTag
          src={
            "https://building-blog.storage.iran.liara.space/1718433007077-Screenshot 2024-06-11 091827.png"
          }
          width={700}
          height={450}
          alt={"test"}
        />
      </div>
      <div className="w-2/3 flex flex-col justify-evenly">
        <span>دسته بندی</span>
        <h3>اینجا موضوع مقاله هستش</h3>
        <div className="flex items-center gap-5 justify-start">
          <div className="flex gap-3 items-center">
            <i>
              <FaCalendarDay />
            </i>
            <span>1403/03/12</span>
          </div>
          |
          <div className="flex gap-3 items-center">
            <i>
              <FaComments />
            </i>
            <span>0</span>
          </div>
          |
          <div>
            <i>
              <FaPhotoVideo />
            </i>
          </div>
        </div>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid
          natus id est iusto dignissimos laborum labore nihil ipsum rerum ab,
          suscipit dolore cum provident eum repudiandae. Est numquam reiciendis
          aut.
        </p>
        <div>
          <button
            title="test"
            type="button"
            className="button-cards bg-blue-400 group text-white rounded-full p-2 flex items-center gap-1"
          >
            <span className="text-button">نمایش صفحه</span>
            <i>
              <FaAngleLeft size={20} />
            </i>
          </button>
        </div>
      </div>
    </Link>
  );
}
