"use client"
import React from 'react'
import { SwiperSlide, Swiper } from 'swiper/react'
import { Pagination } from 'swiper/modules';
import CardProjects from '../CardProjects/CardProjects';
import CustomButton from '../CustomButton/CustomButton';
import Link from 'next/link';
import { CardPostType, CardProjectsType, ExpertType } from '@/app/type';
import CardPost from '../CardPost/CardPost';
import { PiListPlus } from 'react-icons/pi';
type SwiperCardsType = {
    data: CardProjectsType[] | CardPostType[] | ExpertType[]
    url: string
    title: string
    isExpert?: boolean
    isProject?: boolean
    isPost?: boolean
}
export default function SwiperCards({ data, url, isPost, title, isExpert, isProject }: SwiperCardsType) {
    if (!data.length) return
    return (
        <>
            <div className='flex w-full justify-between items-center'>
                <h3 className='text-xl'>
                    {title}
                </h3>
                <Link href={url} className='w-36'>
                    <CustomButton name='نمایش بیشتر' className='w-full' iconEnd={<PiListPlus />} type='button' />
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
                {isPost ?
                    data.map((item) => (
                        <SwiperSlide key={item.id}>
                            <CardPost post={item as CardPostType} />
                        </SwiperSlide>
                    )) :
                    data.map((item) => (
                        <SwiperSlide key={item.id}>
                            <CardProjects project={item as CardProjectsType} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </>
    )
}