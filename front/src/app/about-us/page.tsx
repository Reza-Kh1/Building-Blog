import Breadcrums from "@/components/Breadcrums/Breadcrums";
import React from "react";
import ImgTag from "@/components/ImgTag/ImgTag";
import Image from "next/image";
import { FaCheck } from "react-icons/fa6";
import SwiperGallery from "@/components/SwiperGallery/SwiperGallery";
import CardProjects from "@/components/CardProjects/CardProjects";
import BannerCallUs from "./BannerCallUs";
const dataBanner = [
  {
    src: "/icon-paint.png",
    text: "طراحی های مدرن و سریع برای دوستانی که میخواهند تغییر های جدید را توی خونه هاشون ارائه بدن",
    title: "طراحی داخلی",
  },
  {
    src: "/icon-home.png",
    text: "طراحی های مدرن و سریع برای دوستانی که میخواهند تغییر های جدید را توی خونه هاشون ارائه بدن",
    title: "ساخت هوشمندانه",
  },
  {
    src: "/icon-check.png",
    text: "طراحی های مدرن و سریع برای دوستانی که میخواهند تغییر های جدید را توی خونه هاشون ارائه بدن",
    title: "اعتبار",
  },
  {
    src: "/icon-money.png",
    text: "طراحی های مدرن و سریع برای دوستانی که میخواهند تغییر های جدید را توی خونه هاشون ارائه بدن",
    title: "ذخیره کردن پول",
  },
  {
    src: "/icon-conflict.png",
    text: "طراحی های مدرن و سریع برای دوستانی که میخواهند تغییر های جدید را توی خونه هاشون ارائه بدن",
    title: "سرعت",
  },
  {
    src: "/icon-worker.png",
    text: "طراحی های مدرن و سریع برای دوستانی که میخواهند تغییر های جدید را توی خونه هاشون ارائه بدن",
    title: "با تجربه",
  },
];
const dataTrustUs = [
  "بیش از 30 سال تجربه",
  "تحویل پروژه در زمان معین شده",
  "100% تضمین و اطمینان",
  "تیمی حرفه ای که از 100+ تشکیل شده",
  "پشتیبانی بی نظیر پس از اتمام پروژه",
  "مشاوره درست و متناسب با شرایط شما",
];
const imagesSrc = ["/5.jpg", "/6.jpg", "/7.jpg", "/8.jpg"]
const dataProject = [{ src: "/6.jpg", url: "#", title: "پروژه برج امید", address: "تهران ، الهیه" }]
export default function page() {
  return (
    <div className="w-full my-6">
      <div className="max-w-7xl mx-auto w-full my-6">
        <Breadcrums />
        <div className="my-5">
          <h1 className="text-2xl mb-2 font-semibold">درباره ما</h1>
          <span>صفحه ای کوچک درباره کار ما</span>
        </div>
      </div>
      <span className="w-full border block"></span>
      <div className="max-w-7xl mx-auto w-full my-10">
        <div className="flex gap-3">
          <div className="w-1/2">
            <h2 className="text-xl">ما کی هستیم ؟</h2>
            <p className="leading-7 text-gray-500">
              ما یک تیم متخصص و با تجربه در زمینه ساخت و ساز هستیم که با هدف
              ارائه خدمات با کیفیت و نوآورانه به مشتریان خود فعالیت می‌کنیم.
            </p>
          </div>
          <div className="w-1/2">
            <SwiperGallery imagesSrc={imagesSrc} />
          </div>
        </div>
      </div>
      <div className="w-full flex gap-3 bg-[#282828] shadow-md">
        <div className="w-1/3 flex items-center">
          <ImgTag src={"/5.jpg"} alt={"test"} width={700} height={600} />
        </div>
        <div className="w-2/3 grid grid-cols-2 gap-8 p-10">
          {dataBanner.map((props, index) => (
            <div className="flex gap-3" key={index}>
              <figure className="text-4xl">
                <Image alt="paint" src={props.src} width={80} height={30} />
              </figure>
              <div>
                <span className="text-slate-200">{props.title}</span>
                <p className="text-slate-400 text-sm mt-2 text-justify">
                  {props.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto w-full my-5 ">
        <h3 className="text-xl font-semibold mb-3">برخی از پروژه های ما</h3>
        <div className="grid grid-cols-3 gap-5">
          <CardProjects data={dataProject} />
        </div>
      </div>
      <BannerCallUs />
      <div className="max-w-7xl mx-auto w-full flex gap-3 items-center">
        <div className="w-1/2">
          <h3 className="text-xl mb-3 font-semibold">
            پروژه خود را به دست حرفه ای ها بسپارید !
          </h3>
          <h4 className="text-sm text-gray-600 mb-3">
            6 نکته ای که باعث میشود به ما اعتماد کنید
          </h4>
          <ul className="flex flex-col gap-2">
            {dataTrustUs.map((i, index) => (
              <li key={index} className="flex items-center gap-3">
                <i>
                  <FaCheck />
                </i>
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-1/2">
          <ImgTag
            src={"/about.jpg"}
            alt={"about-us"}
            width={500}
            height={450}
          />
        </div>
      </div>
    </div>
  );
}
