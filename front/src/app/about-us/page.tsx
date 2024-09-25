"use client";
import Breadcrums from "@/components/Breadcrums/Breadcrums";
import React, { useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import ImgTag from "@/components/ImgTag/ImgTag";
import { FaHome } from "react-icons/fa";
import { FcDepartment } from "react-icons/fc";
import Image from "next/image";
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
          <figure>
            <ImgTag src={"/5.jpg"} alt={"test"} width={700} height={600} />
          </figure>
        </div>
        <div className="w-1/3 flex flex-col gap-8 p-10">
          <div className="flex gap-3">
            <figure className="text-4xl">
              <Image
                alt="paint"
                src={"/icon-paint.png"}
                width={80}
                height={30}
              />
            </figure>

            <div>
              <span className="text-slate-200">طراحی داخلی</span>
              <p className="text-slate-400 text-sm mt-2 text-justify">
                طراحی های مدرن و سریع برای دوستانی که میخواهند تغییر های جدید را
                توی خونه هاشون ارائه بدن
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <figure className="text-4xl">
              <Image
                alt="paint"
                src={"/icon-home.png"}
                width={80}
                height={30}
              />
            </figure>
            <div>
              <span className="text-slate-200">ساخت هوشمندانه</span>
              <p className="text-slate-400 text-sm mt-2 text-justify">
                طراحی های مدرن و سریع برای دوستانی که میخواهند تغییر های جدید را
                توی خونه هاشون ارائه بدن
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <figure className="text-4xl">
              <Image
                alt="paint"
                src={"/icon-check.png"}
                width={80}
                height={30}
              />
            </figure>
            <div>
              <span className="text-slate-200">اعتبار</span>
              <p className="text-slate-400 text-sm mt-2 text-justify">
                طراحی های مدرن و سریع برای دوستانی که میخواهند تغییر های جدید را
                توی خونه هاشون ارائه بدن
              </p>
            </div>
          </div>
        </div>
        <div className="w-1/3 flex flex-col gap-8 p-10">
          <div className="flex gap-3">
            <figure className="text-4xl">
              <Image
                alt="paint"
                src={"/icon-money.png"}
                width={80}
                height={30}
              />
            </figure>
            <div>
              <span className="text-slate-200">ذخیره کردن پول</span>
              <p className="text-slate-400 text-sm mt-2 text-justify">
                طراحی های مدرن و سریع برای دوستانی که میخواهند تغییر های جدید را
                توی خونه هاشون ارائه بدن
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <figure className="text-4xl">
              <Image
                alt="paint"
                src={"/icon-conflict.png"}
                width={80}
                height={30}
              />
            </figure>
            <div>
              <span className="text-slate-200">سرعت</span>
              <p className="text-slate-400 text-sm mt-2 text-justify">
                طراحی های مدرن و سریع برای دوستانی که میخواهند تغییر های جدید را
                توی خونه هاشون ارائه بدن
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <figure className="text-4xl">
              <Image
                alt="paint"
                src={"/icon-worker.png"}
                width={80}
                height={30}
              />
            </figure>
            <div>
              <span className="text-slate-200">با تجربه</span>
              <p className="text-slate-400 text-sm mt-2 text-justify">
                طراحی های مدرن و سریع برای دوستانی که میخواهند تغییر های جدید را
                توی خونه هاشون ارائه بدن
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
