"use client"
import React from 'react'
import { EffectFade, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/effect-fade';
export default function SwiperHero() {
    return (
        <Swiper
            spaceBetween={30}
            effect={'fade'}
            pagination={{
                clickable: true,
            }}
            loop={true}
            modules={[EffectFade, Pagination]}
            className="mySwiper"
        >
            <SwiperSlide>
                <div className='w-full h-[550px] bg-image relative' style={{ backgroundImage: `url(${"/about-us (2).jpg"})` }}>
                    <div className='absolute top-1/3 w-1/2 right-10 transform -translate-y-1/2 bg-gray-800/80 p-3 rounded-xl shadow-md'>
                        <h3 className='text-gray-50 mb-5 text-xl'>این بخش برای تست هستش میخوام تست کنم</h3>
                        <p className='text-gray-200'>بخش خش تست هستش ولی زیاد هم نیستش هاخش تست هستش ولی زیاد هم نیستش هاخش تست هستش ولی زیاد هم نیستش هاتست هستش ولی زیاد هم نیستش هاها</p>
                    </div>
                    <div className='absolute bottom-10  left-10 bg-gray-800/80 p-3 rounded-xl shadow-md'>
                        <span className='text-gray-50 text-sm'>
                            تست شماره دکمه ها
                        </span>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='w-full h-[550px] bg-image relative' style={{ backgroundImage: `url(${"/category.jpg"})` }}>
                    <div className='absolute top-1/3 right-10 transform -translate-y-1/2 bg-gray-800/80 p-3 rounded-md shadow-md'>
                        <h3 className='text-gray-50 mb-5 text-xl'>این بخش برای تست هستش میخوام تست کنم</h3>
                        <p className='text-gray-300'>بخش خش تست هستش ولی زیاد هم نیستش هاخش تست هستش ولی زیاد هم نیستش هاخش تست هستش ولی زیاد هم نیستش هاتست هستش ولی زیاد هم نیستش هاها</p>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='w-full h-[550px] bg-image relative' style={{ backgroundImage: `url(${"/7.jpg"})` }}>
                    <div className='absolute top-1/3 right-10 transform -translate-y-1/2 bg-gray-800/80 p-3 rounded-md shadow-md'>
                        <h3 className='text-gray-50 mb-5 text-xl'>این بخش برای تست هستش میخوام تست کنم</h3>
                        <p className='text-gray-300'>بخش خش تست هستش ولی زیاد هم نیستش هاخش تست هستش ولی زیاد هم نیستش هاخش تست هستش ولی زیاد هم نیستش هاتست هستش ولی زیاد هم نیستش هاها</p>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='w-full h-[550px] bg-image relative' style={{ backgroundImage: `url(${"/8.jpg"})` }}>
                    <div className='absolute top-1/3 right-10 transform -translate-y-1/2 bg-gray-800/80 p-3 rounded-md shadow-md'>
                        <h3 className='text-gray-50 mb-5 text-xl'>این بخش برای تست هستش میخوام تست کنم</h3>
                        <p className='text-gray-300'>بخش خش تست هستش ولی زیاد هم نیستش هاخش تست هستش ولی زیاد هم نیستش هاخش تست هستش ولی زیاد هم نیستش هاتست هستش ولی زیاد هم نیستش هاها</p>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    )
}
