import React from "react";
import ImgTag from "../ImgTag/ImgTag";
import Link from "next/link";
import { FaAngleLeft, FaCalendarDays, FaComments } from "react-icons/fa6";
import { FaPhotoVideo } from "react-icons/fa";
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
export default function Cards() {
  return (
    <Link
      href={"/post/api"}
      className="card-box w-full group max-w-7xl flex gap-5 hover:bg-[#f1f9ff] hover:shadow-lg p-3 rounded-md transition-all"
    >
      <div className="w-1/3">
        <ImgTag alt={test.title} height={300} src={test.image} width={7750} />
      </div>
      <div className="w-2/3 flex justify-between flex-col py-2">
        <span className="text-sm">دسته بندی</span>
        <h4 className="text-lg">موضوع پست</h4>
        <div className="flex gap-5">
          <i>
            <FaPhotoVideo />
          </i>
          |
          <p className="flex gap-2">
            0
            <i>
              <FaComments />
            </i>
          </p>
          |
          <p className="flex gap-2">
            {new Date(test.updatedAt).toLocaleDateString("fa")}
            <i>
              <FaCalendarDays />
            </i>
          </p>
        </div>
        <p className="text-sm">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam, architecto distinctio. Totam ratione distinctio quos hic, molestias cupiditate voluptas exercitationem maiores, amet esse natus, voluptates at quisquam! Expedita, dolore minima.</p>
        <div>
          <button type="button" title="button" className="custom-button-card relative flex items-center bg-gradient-to-b from-blue-400/70 to-blue-500 rounded-full group-hover:from-blue-500/70 shadow-md  group-hover:to-blue-600/90 p-2  text-white">
            <span className="group-hover:block ">مشاهده مقاله</span>
            <i>
              <FaAngleLeft />
            </i>
          </button>
        </div>
      </div>
    </Link>
  );
}
