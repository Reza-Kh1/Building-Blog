import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function Navbar() {
  const [time, setTime] = useState({ week: "", date: "" });
  const [userInfo, setUserInfo] = useState<{ name: string; role: string }>();
  const navigate = useNavigate();
  useEffect(() => {
    const localData = localStorage.getItem("user") as any;
    if (!localData) {
      toast.error("! اول وارد حساب کاربری خود شوید");
      navigate("/");
      localStorage.setItem("user", "");
      return;
    }
    setUserInfo(JSON.parse(localData));
    const date = new Date().toLocaleDateString("fa");
    const week = new Date().toLocaleDateString("fa", {
      weekday: "long",
    });
    setTime({ week, date });
  }, []);
  return (
    <div className="w-full p-2">
      <div className=" flex bg-gray-100 rounded-md shadow-md mb-2 p-2">
        <div className="w-4/12 flex items-center">
          <span className="ml-1">
            {userInfo?.role === "ADMIN" ? "ادمین" : "نویسنده"}
          </span>
          <span>{userInfo?.name}</span>
        </div>
        <div className="w-4/12 text-center flex items-center justify-center text-gray-800">
          <span className="ml-2">{time.week}</span>
          <span>{time.date}</span>
        </div>
        <div className="w-4/12 flex gap-4 items-center justify-end">
          <Button
            onClick={() => navigate(-1)}
            variant="contained"
            color="info"
            endIcon={<MdOutlineArrowBackIos />}
          >
            بازگشت
          </Button>
        </div>
      </div>
    </div>
  );
}
