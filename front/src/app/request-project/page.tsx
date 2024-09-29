import React from "react";
import { FaStar } from "react-icons/fa6";
import FormRequest from "./FormRequest";
import { PiWarningDiamondFill } from "react-icons/pi";
import ContactSocialMedia from "@/components/ContactSocialMedia/ContactSocialMedia";
import Breadcrums from "@/components/Breadcrums/Breadcrums";
export default function page() {
  return (
      <div className="max-w-7xl mx-auto w-full my-6">
        <Breadcrums />
        <h1 className="text-xl font-semibold mb-5 mt-6">
          گرفتن قیمت کار ساختمانی آنلاین
        </h1>
        <div className="flex items-center gap-2">
          <i className="text-yellow-300 text-xl">
            <FaStar />
          </i>
          <span>
            {" "}
            در این صفحه میتوانید با بارگزاری عکس از محیط کار یا پروژه خود و پر
            کردن فرم های خواسته شده میتوانید از ما به صورت آنلاین قیمت بگیرید در
            کمتر از 6 ساعت به درخواست شما پاسخ خواهیم داد.
          </span>
        </div>
        <div className="mt-16 block">
          <div className="text-center mb-5">
            <div className="font-semibold flex gap-3 items-center justify-center mb-5">
              <i className="text-orange-500 text-2xl">
                <PiWarningDiamondFill />
              </i>
              <span className="text-red-500">
                اگر عکس یا فیلم شما حجم بیش از 10 مگابایت دارد لطفا در شبکه های
                اجتماعی برای ما ارسال کنید
              </span>
              <i className="text-orange-500 text-2xl">
                <PiWarningDiamondFill />
              </i>
            </div>
            <span className="">فیلد های ستاره دار الزامی هستند.</span>
          </div>
          <FormRequest />
          <p className="mt-5">
            میتوانید در شبکه های اجتماعی برای ما اطلاعات کار خود را متناسب با
            فرم ها ارسال کنید.
          </p>
          <div className="my-16 flex gap-3">
            <ContactSocialMedia />
          </div>
        </div>
      </div>
  );
}
