"use client";
import React, { CSSProperties, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import ImgTag from "../ImgTag/ImgTag";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

export default function SwiperGallery({ imagesSrc }: { imagesSrc: string[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  return (
    <>
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          } as CSSProperties
        }
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {imagesSrc.map((i, index) => (
          <SwiperSlide key={index}>
            <ImgTag width={350} height={250} alt={"گالری"} src={i} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper mt-3"
      >
        {imagesSrc.map((i, index) => (
          <SwiperSlide key={index} className="cursor-pointer">
            <ImgTag width={250} height={250} alt={"test"} src={i} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
