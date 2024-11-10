import React from "react";
import { FaStar } from "react-icons/fa6";
import FormRequest from "./FormRequest";
import { PiWarningDiamondFill } from "react-icons/pi";
import ContactSocialMedia from "@/components/ContactSocialMedia/ContactSocialMedia";
import Breadcrums from "@/components/Breadcrums/Breadcrums";
export default function page() {
  return (
    <div className="w-full">
      <Breadcrums />
      <div className="classDiv">
        <h1 className="lg:text-xl font-semibold mb-3">
          محسابه آنلاین هزینه ساخت
        </h1>
        <div className="flex items-start md:items-center gap-2">
          <i className="text-yellow-300 text-xl">
            <FaStar />
          </i>
          <p className="text-sm md:text-base text-justify">
            در این صفحه میتوانید با بارگزاری عکس از محیط کار یا پروژه خود و پر
            کردن فرم های خواسته شده میتوانید از ما به صورت آنلاین قیمت بگیرید در
            کمتر از 6 ساعت به درخواست شما پاسخ خواهیم داد.
          </p>
        </div>
        <div className="font-semibold my-8 md:my-16 text-center flex gap-3 items-center justify-center mb-5">
          <i className="text-orange-400 text-2xl">
            <PiWarningDiamondFill />
          </i>
          <span className="text-red-400 text-sm md:text-base">
            اگر عکس یا فیلم شما حجم بیش از 10 مگابایت دارد لطفا در شبکه های
            اجتماعی برای ما ارسال کنید
          </span>
          <i className="text-orange-400 text-2xl">
            <PiWarningDiamondFill />
          </i>
        </div>
        <span className="text-sm md:text-base block mb-3">فیلد های ستاره دار الزامی هستند.</span>
        <FormRequest />
        <p className="mt-5 flex items-start md:items-center gap-2">
          <i className="text-orange-400 text-2xl">
            <PiWarningDiamondFill />
          </i>
          میتوانید در شبکه های اجتماعی برای ما اطلاعات کار خود را
          ارسال کنید.
        </p>
      </div>
      <ContactSocialMedia />
    </div>
  );
}
