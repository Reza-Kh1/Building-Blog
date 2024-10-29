import { Button } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import { FaSearchDollar } from "react-icons/fa";
import { FaPaintbrush, FaUsers } from "react-icons/fa6";
import { GrUserWorker } from "react-icons/gr";
import { TiMessages } from "react-icons/ti";
import { BiSolidMessageRoundedError } from "react-icons/bi";

import {
  MdImage,
  MdOutlineCategory,
  MdOutlinePostAdd,
  MdSettings,
} from "react-icons/md";
import { BsFillBuildingsFill } from "react-icons/bs";
import { BiSolidDashboard } from "react-icons/bi";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import PendingApi from "../PendingApi/PendingApi";
import { LinkSidebarType } from "../../type";
import { IoMdPricetags } from "react-icons/io";
const dataLink = [
  { name: "داشبورد", url: "/home/dashboard", icon: <BiSolidDashboard /> },
  { name: "صفحات سایت", url: "/home/page-info", icon: <FaPaintbrush /> },
  {
    name: "پست ها",
    url: "/home/posts?page=1&order=createdAt-DESC&search=&tags=",
    icon: <MdOutlinePostAdd />,
  },
  {
    name: "کامنت ها",
    url: "/home/reviews?page=1&order=createdAt-DESC&search=&tags=",
    icon: <TiMessages />,
  },
  {
    name: "کاربران",
    url: "/home/users?page=1&order=createdAt-DESC&role=all&search=&tags=",
    icon: <FaUsers />,
  },
  {
    name: "پروژه ها",
    url: "/home/projects?page=1&order=createdAt-DESC&search=&tags=",
    icon: <BsFillBuildingsFill />,
  },
  {
    name: "متخصص ها",
    url: "/home/worker?page=1&order=createdAt-DESC&role=all&search=&tags=",
    icon: <GrUserWorker />,
  },
  {
    name: "پیام ها",
    url: "/home/message?page=1&order=createdAt-DESC&status=false",
    icon: <BiSolidMessageRoundedError />,
  },
  {
    name: "تعیین قیمت",
    url: "/home/online-price?page=1&order=createdAt-DESC&status=false",
    icon: <FaSearchDollar />,
  },
  { name: "دسته بندی", url: "/home/categorys", icon: <MdOutlineCategory /> },
  { name: "تگ ها", url: "/home/tags", icon: <IoMdPricetags /> },
  { name: "رسانه ها", url: "/home/image", icon: <MdImage /> },
  { name: "تنظیمات", url: "/home/setting", icon: <MdSettings /> },
];
export default function Sidebar() {
  const navigate = useNavigate();
  const [load, setLaod] = useState<Boolean>(false);
  const logOutUser = () => {
    setLaod(true);
    axios
      .get("/user/logout")
      .then(() => {
        toast.success("با موفقیت از حساب خارج شدید");
        navigate("/");
        localStorage.setItem("user", "");
      })
      .catch((err) => {
        console.log(err);
        toast.error("دوباره تلاش کنید!");
      })
      .finally(() => {
        setLaod(false);
      });
  };
  const LinkSidebar = ({ url, name, icon }: LinkSidebarType) => {
    return (
      <NavLink
        to={url}
        className={({ isActive }) =>
          `inline-block w-11/12 mr-0 ${!isActive ? "" : "mr-5"}`
        }
      >
        <Button
          className="!bg-[#4889f7]"
          fullWidth
          variant="contained"
          startIcon={icon}
        >
          {name}
        </Button>
      </NavLink>
    );
  };
  const { role } = JSON.parse(localStorage.getItem("user") as any);
  return (
    <div className="w-full p-2 right-0 sidebar-site top-0 sticky">
      {load && <PendingApi />}
      <ul className="bg-gray-100 p-3 rounded-md flex flex-col gap-3">
        {dataLink.map((i, index) => {
          if (i.name === "کاربران" && role !== "ADMIN") return;
          return (
            <li key={index}>
              <LinkSidebar name={i.name} url={i.url} icon={i.icon} />
            </li>
          );
        })}
        <li className="w-11/12">
          <Button
            onClick={logOutUser}
            fullWidth
            color="error"
            variant="contained"
            startIcon={<IoLogOutOutline />}
          >
            خروج
          </Button>
        </li>
      </ul>
    </div>
  );
}
