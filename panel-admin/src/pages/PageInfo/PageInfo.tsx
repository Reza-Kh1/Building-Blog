import { Button } from "@mui/material";
import AboutMe from "../../components/AboutMe/AboutMe";
import { useState } from "react";
import { IoMdEye, IoIosEyeOff } from "react-icons/io";
import Faqs from "../../components/Faqs/Faqs";
import Footer from "../../components/Footer/Footer";
export default function PageInfo() {
  const [dataAbout, setDataAbout] = useState<boolean>(false);
  const [dataFaqs, setDataFaqs] = useState<boolean>(false);
  const [dataFooter, setDataFooter] = useState<boolean>(false);
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between shadow-md bg-slate-100 border p-2 rounded-md">
        <h1 className="text-xl font-semibold">صفحه درباره ما</h1>
        <Button
          onClick={() => setDataAbout((prev) => !prev)}
          variant="contained"
          color={dataAbout ? "warning" : "info"}
          endIcon={dataAbout ? <IoIosEyeOff /> : <IoMdEye />}
        >
          {dataAbout ? "بستن اطلاعات" : " مشاهده اطلاعات"}
        </Button>
      </div>
      {dataAbout ? <AboutMe /> : null}
      <div className="flex items-center justify-between shadow-md bg-slate-100 border p-2 rounded-md">
        <h1 className="text-xl font-semibold">صفحه سوالات متداول</h1>
        <Button
          onClick={() => setDataFaqs((prev) => !prev)}
          variant="contained"
          color={dataFaqs ? "warning" : "info"}
          endIcon={dataFaqs ? <IoIosEyeOff /> : <IoMdEye />}
        >
          {dataFaqs ? "بستن اطلاعات" : " مشاهده اطلاعات"}
        </Button>
      </div>
      {dataFaqs ? <Faqs /> : null}
      <div className="flex items-center justify-between shadow-md bg-slate-100 border p-2 rounded-md">
        <h1 className="text-xl font-semibold">فوتر</h1>
        <Button
          onClick={() => setDataFooter((prev) => !prev)}
          variant="contained"
          color={dataFooter ? "warning" : "info"}
          endIcon={dataFooter ? <IoIosEyeOff /> : <IoMdEye />}
        >
          {dataFooter ? "بستن اطلاعات" : " مشاهده اطلاعات"}
        </Button>
      </div>
      {dataFooter ? <Footer /> : null}
    </div>
  );
}
