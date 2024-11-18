import React from 'react'
import ImgTag from '../ImgTag/ImgTag'
import "./style.css"
import { servicesData } from '@/data/dataService'
export default function BannerFooter() {
    return (
        <section className='banner-footer w-full md:py-6 py-3 my-3 p-3 shadow-md md:my-6'>
            <ul className='flex justify-between md:justify-evenly items-center gap-1 md:gap-3 text-gray-400'>
                {servicesData.map((i, index) => (
                    <li className='flex flex-col items-center gap-3 justify-center' key={index}>
                        <ImgTag src={i.img} classPlus='md:w-12 w-7  h-auto' alt={i.alt} width={96} height={96} />
                        <span className='text-[8px] md:text-base'>
                            {i.title}
                        </span>
                    </li>
                ))}
            </ul>
        </section>
    )
}