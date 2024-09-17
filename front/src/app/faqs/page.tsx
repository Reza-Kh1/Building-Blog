import Breadcrums from '@/components/Breadcrums/Breadcrums'
import Link from 'next/link'
import React from 'react'

export default function page() {
    return (
        <div className='faqs-page w-full my-5'>
            <div>

            </div>

            <div className='flex flex-wrap w-full max-w-7xl mx-auto'>
                <div className='w-full mb-5'>
                    <Breadcrums />
                </div>
                <div className='w-3/4'>
                    <h1 className='text-xl font-semibold'>
                        برخی از سوالات شما :
                    </h1>
                    <span className='text-sm'>
                        ما در اینجا آمده ایم صفحه ای رو تهیه کردیم که بیشتر سوالات شمارو پاسخ داده باشد و بتواند بهتون کمک کند تا سریع تر به پاسختون برسید.
                    </span>
                </div>
                <div className='w-1/4'>
                    <div className='w-full bg-gray-800 rounded-md p-3'>
                        <h2 className='text-white text-xl font-medium mb-5'>درباره ما</h2>
                        <p className='text-gray-200 text-justify leading-7'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab magni saepe, quam dolore, unde commodi fugit voluptatibus excepturi tenetur delectus iusto, aut porro qui earum magnam, doloribus nostrum laborum sed laudantium incidunt. Provident incidunt odio, labore magni, unde quam modi.</p>
                        <Link href={"/about-us"}>
                            <button type='button' className='bg-green-600 font-medium text-white p-2 rounded px-4 text-sm mt-5 shadow-md after:bottom-0 after:bg-green-700/50 after:w-full after:h-1 after:left-0 relative after:absolute after:rounded-xl'>
                                مطالعه بیشتر
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
