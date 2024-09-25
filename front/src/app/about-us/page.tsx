"use client"
import Breadcrums from '@/components/Breadcrums/Breadcrums'
import React, { useState } from 'react'
import { SwiperSlide, Swiper } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import ImgTag from '@/components/ImgTag/ImgTag';
export default function page() {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  return (
    <div>
      <div className='max-w-7xl mx-auto w-full my-10'>
        <Breadcrums />
        <div className='my-5'>
          <h1 className='text-2xl mb-2 font-semibold'>
            درباره ما
          </h1>
          <span>صفحه ای کوچک درباره کار ما</span>
        </div>
      </div>
      <span className='w-full border block'></span>
      <div className='max-w-7xl mx-auto w-full my-10'>
        <div className='flex gap-3'>
          <div className='w-1/2'>
            <h2 className='text-xl'>
              ما کی هستیم ؟
            </h2>
            <p className='leading-7 text-gray-500'>
              ما یک تیم متخصص و با تجربه در زمینه ساخت و ساز هستیم که با هدف ارائه خدمات با کیفیت و نوآورانه به مشتریان خود فعالیت می‌کنیم.
            </p>
          </div>
          <div className='w-1/2'>

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
            </Swiper>
          </div>
        </div>
      </div>
    </div>

  )
}
