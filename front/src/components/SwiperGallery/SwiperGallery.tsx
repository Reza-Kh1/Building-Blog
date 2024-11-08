"use client";
import React, { CSSProperties, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import ImgTag from "../ImgTag/ImgTag";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { ImageType } from "@/app/type";
export default function SwiperGallery({
  imagesSrc,
}: {
  imagesSrc?: ImageType[];
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  if (!imagesSrc?.length) return;
  return (
    <>
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#1a1c1c",
            "--swiper-pagination-color": "#1a1c1c",
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
            <ImgTag
              width={450}
              height={300}
              classPlus="h-56 w-[350px] lg:h-72 lg:w-96 object-cover"
              alt={i?.alt}
              src={i?.url}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="!py-2"
        loop={true}
      >
        {imagesSrc.map((i, index) => (
          <SwiperSlide key={index}>
            <ImgTag
              width={160}
              height={115}
              classPlus="cursor-pointer h-28 w-40 object-cover"
              alt={i?.alt}
              src={i?.url}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
