"use client";
import Breadcrums from "@/components/Breadcrums/Breadcrums";
import React, { useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import ImgTag from "@/components/ImgTag/ImgTag";
import { FaChevronLeft, FaHome } from "react-icons/fa";
import { FcDepartment } from "react-icons/fc";
import Image from "next/image";
import { FaCheck, FaPlay } from "react-icons/fa6";
import Link from "next/link";
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
export default function page() {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  return (
    <div className="w-full my-10">
      <div className="max-w-7xl mx-auto w-full my-10">
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
            {/* 
            <Swiper
              style={{
                '--swiper-navigation-color': '#fff',
                '--swiper-pagination-color': '#fff',
              }}
              loop={true}
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper2"
            >
              <SwiperSlide>
                <ImgTag width={350} height={250} alt={"test"} src="/5.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <ImgTag width={350} height={250} alt={"test"} src="/6.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <ImgTag width={350} height={250} alt={"test"} src="/7.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <ImgTag width={350} height={250} alt={"test"} src="/8.jpg" />
              </SwiperSlide>
            </Swiper>
            <Swiper
              onSwiper={setThumbsSwiper}
              loop={true}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper"
            >
              <SwiperSlide>
                <ImgTag width={250} height={250} alt={"test"} src="/5.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <ImgTag width={250} height={250} alt={"test"} src="/6.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <ImgTag width={250} height={250} alt={"test"} src="/7.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <ImgTag width={250} height={250} alt={"test"} src="/8.jpg" />
              </SwiperSlide>
            </Swiper> */}
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
          <div>
            <Link href={"#"} className="relative group">
              <ImgTag
                fiureClass="relative w-full overflow-hidden rounded-md"
                alt={"نمونه پروژه"}
                src={"/6.jpg"}
                width={500}
                height={350}
                classPlus="hover-project"
              />
              <i className="p-3 group-hover:opacity-100 transition-all opacity-0 hover:bg-gray-50 rounded-full bg-gray-200/80 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <FaPlay />
              </i>
            </Link>
            <div className="flex flex-col gap-2 mt-3">
              <div>
                <Link href={"#"} className="inline-block">
                  <span className="hover:text-blue-400">پروژه برج امید</span>
                </Link>
              </div>
              <span className="text-sm text-gray-700">تهران ، الهیه</span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full my-10 py-5 bg-blue-400 shadow-md flex items-center gap-2 justify-center relative">
        <span className="text-white">
          آیا میخواهید خانه رویایی خود را با ما بسازید ؟
        </span>
        <Link href={"#"} className="text-white font-semibold">اینجا کلیک کنید</Link>
        <span className="w-full absolute h-1 bg-blue-500/70 left-0 bottom-0"></span>
      </div>
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
