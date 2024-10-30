"use client"
import React from 'react'
import { SwiperSlide, Swiper } from 'swiper/react'
import { Pagination } from 'swiper/modules';
import CardProjects from '../CardProjects/CardProjects';
import CustomButton from '../CustomButton/CustomButton';
import Link from 'next/link';
import { BsArrowDownLeftSquare } from 'react-icons/bs';

const data = [{
    "id": 9,
    "name": "برج خلیفا",
    "address": "تهران-شمال",
    "image": "https://building-blog.storage.iran.liara.space/1728717013892-azadi.jpg",
    "alt": "برج آزادی",
    "status": false,
    "createdAt": "2024-10-16T10:21:07.519Z",
    "updatedAt": "2024-10-16T10:21:07.519Z",
    "workerId": 3,
    "Worker": {
        "name": "حسن فیاضی"
    }
}]
export default function SwiperCards() {
    return (
        <div>
            <div className='flex w-full justify-between items-center'>
                <h3 className='font-semibold'>
                    پروژه های دیگر
                </h3>
                <Link href={"#"} className='w-36'>
                    <CustomButton name='نمایش بیشتر' className='w-full' iconEnd={<BsArrowDownLeftSquare />} type='button' />
                </Link>
            </div>
            <Swiper
                slidesPerView={3}
                pagination={{
                    dynamicBullets: true,
                    clickable: true
                }}
                spaceBetween={"50"}
                modules={[Pagination]}
                className='!py-10'
            >
                <SwiperSlide>
                    <CardProjects data={data} />
                </SwiperSlide>
                <SwiperSlide>
                    <CardProjects data={data} />
                </SwiperSlide>
                <SwiperSlide>
                    <CardProjects data={data} />
                </SwiperSlide>
                <SwiperSlide>
                    <CardProjects data={data} />
                </SwiperSlide>
                <SwiperSlide>
                    <CardProjects data={data} />
                </SwiperSlide>
                <SwiperSlide>
                    <CardProjects data={data} />
                </SwiperSlide>
                <SwiperSlide>
                    <CardProjects data={data} />
                </SwiperSlide>
            </Swiper>
        </div>

    )
}
