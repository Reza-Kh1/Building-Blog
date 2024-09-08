import React from "react";
import ImgTag from "../ImgTag/ImgTag";
import Link from "next/link";
import { FaCalendarDays, FaComments } from "react-icons/fa6";
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
export default function CardsBox() {
  return (
    <div className=" w-3/12 h-96" style={{ backgroundImage: `url("${test.image}")` }}>
      <Link
        href={test.slug}
        className="card-box rounded-md shadow-md relative overflow-hidden"
      >
        <span className="text-xs">{test.name}</span>
        <h4 className="text-lg">{test.title}</h4>
        {/* <div className="absolute top-0 -z-[1] left-0 w-full h-full">
          <ImgTag alt={test.title} height={100} src={test.image} width={7750} />
        </div> */}
        <div className="flex justify-evenly items-center">
          <i>
            <FaPhotoVideo />
          </i>
          <span className="flex gap-2 items-center">
            {Number(test.totalComments)}
            <i>
              <FaComments />
            </i>
          </span>
          <span className="flex gap-2 items-center">
            {new Date(test.updatedAt).toLocaleDateString("fa")}
            <i>
              <FaCalendarDays />
            </i>
          </span>
        </div>
        <p className="text-sm">{test.description}</p>
      </Link>
    </div>
  );
}
