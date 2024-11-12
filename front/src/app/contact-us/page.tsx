import Breadcrums from "@/components/Breadcrums/Breadcrums";
import ImgTag from "@/components/ImgTag/ImgTag";
import React from "react";
import FormContactUs from "./FormContactUs";
import ContactSocialMedia from "@/components/ContactSocialMedia/ContactSocialMedia";
export default function page() {
  return (
    <div className="w-full">
      <Breadcrums />
      <div className="classDiv">
        <div className="mt-6">
          <h1 className="text-2xl mb-2 block font-semibold dark:text-h-dark">ارتباط با ما</h1>
          <p className="dark:text-s-dark text-gray-700">
            با ما در ارتباط باشید تا پروژه‌های ساختمانی خود را با راهکارهای
            حرفه‌ای و نوآورانه به واقعیت تبدیل کنید. تیم ما آماده پاسخگویی به
            سوالات و ارائه مشاوره‌های تخصصی است.
          </p>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-3 my-12 justify-around">
          <div className="md:w-1/2 w-full md:order-1 order-2">
            <h3 className="text-xl mb-5 dark:text-p-dark">پیام خود را برای ما ارسال کنید.</h3>
            <FormContactUs />
          </div>
          <figure className="md:w-1/2 w-full md:order-2 order-1">
            <ImgTag
              src={"/contact-us.jpg"}
              alt={"contact-us"}
              classPlus="w-full max-h-[450px] object-cover"
              height={350}
              width={400}
            />
          </figure>
        </div>
      </div>
      <ContactSocialMedia />
    </div>
  );
}
