import { Button } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa6"
import { MdImage, MdOutlineCategory, MdOutlineMailOutline, MdOutlinePostAdd, MdSettings } from "react-icons/md";
import { BiSolidDashboard } from "react-icons/bi";
import axios from "axios";
import { toast } from "react-toastify";
export default function Sidebar() {
  const navigate = useNavigate()
  const logOut = () => {
    axios.get("/user/logout").then(() => {
      toast.success("با موفقیت از حساب خارج شدید")
      navigate("/")
    }).catch((err) => {
      console.log(err);
      toast.error("دوباره تلاش کنید!")
    })
  }
  return (
    <div className="w-full p-2 right-0 sidebar-site top-0 sticky">
      <ul className="bg-gray-100 p-3 rounded-md flex flex-col gap-3">
        <li>
          <NavLink to={"/home/dashboard"} className={({ isActive }) => `transition-all inline-block w-11/12 ${!isActive ? "" : "mr-5 !bg-slate-300"}`}>
            <Button className="!bg-[#4889f7]" fullWidth variant="contained" startIcon={<BiSolidDashboard />}>
              داشبورد
            </Button>
          </NavLink>
        </li>
        <li>
          <NavLink to={"/home/posts"} className={({ isActive }) => `transition-all inline-block w-11/12 ${!isActive ? "" : "mr-5 !bg-slate-300"}`}>
            <Button className="!bg-[#4889f7]" fullWidth variant="contained" startIcon={<MdOutlinePostAdd />}>
              پست ها
            </Button>
          </NavLink>
        </li>
        <li>
          <NavLink to={"/home/reviews"} className={({ isActive }) => `transition-all inline-block w-11/12 ${!isActive ? "" : "mr-5 !bg-slate-300"}`}>
            <Button className="!bg-[#4889f7]" fullWidth variant="contained" startIcon={<MdOutlineMailOutline />}>
              نظرات
            </Button>
          </NavLink>
        </li>
        <li>
          <NavLink to={"/home/users"} className={({ isActive }) => `transition-all inline-block w-11/12 ${!isActive ? "" : "mr-5 !bg-slate-300"}`}>
            <Button className="!bg-[#4889f7]" fullWidth variant="contained" startIcon={<FaUsers />}>
              کاربران
            </Button>
          </NavLink>
        </li>


        <li>
          <NavLink to={"/home/categorys"} className={({ isActive }) => `transition-all inline-block w-11/12 ${!isActive ? "" : "mr-5 !bg-slate-300"}`}>
            <Button className="!bg-[#4889f7]" fullWidth variant="contained" startIcon={<MdOutlineCategory />}>
              دسته بندی
            </Button>
          </NavLink>
        </li>
        <li>
          <NavLink to={"/home/image"} className={({ isActive }) => `transition-all inline-block w-11/12 ${!isActive ? "" : "mr-5 !bg-slate-300"}`}>
            <Button className="!bg-[#4889f7]" fullWidth variant="contained" startIcon={<MdImage />}>
              رسانه ها
            </Button>
          </NavLink>
        </li>
        <li>
          <NavLink to={"/home/setting"} className={({ isActive }) => `transition-all inline-block w-11/12 ${!isActive ? "" : "mr-5 !bg-slate-300"}`}>
            <Button className="!bg-[#4889f7]" fullWidth variant="contained" startIcon={<MdSettings />}>
              تنظیمات
            </Button>
          </NavLink>
        </li>
        <li className="w-11/12">
          <Button onClick={logOut} fullWidth color="error" variant="contained" startIcon={<IoLogOutOutline />}>
            خروج
          </Button>
        </li>
      </ul>
    </div>
  );
}
