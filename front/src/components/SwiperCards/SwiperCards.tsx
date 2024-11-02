"use client"
import React from 'react'
import { SwiperSlide, Swiper } from 'swiper/react'
import { Pagination } from 'swiper/modules';
import CardProjects from '../CardProjects/CardProjects';
import CustomButton from '../CustomButton/CustomButton';
import Link from 'next/link';
import { BsArrowDownLeftSquare } from 'react-icons/bs';
import { CardProjectsType } from '@/app/type';
export default function SwiperCards({ data, url }: { data: CardProjectsType[], url: string }) {
    return (
        <div>
            {data.length ?
                <>
                    <div className='flex w-full justify-between items-center'>
                        <h3 className='font-semibold'>
                            پروژه های دیگر
                        </h3>
                        <Link href={url} className='w-36'>
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
                        {data.map((item) => (
                            <SwiperSlide key={item.id}>
                                <CardProjects project={item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </>
                : null}
        </div>

    )
}
