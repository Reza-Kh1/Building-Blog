import ImgTag from '@/components/ImgTag/ImgTag'
import React from 'react'
import { FaPhotoVideo } from 'react-icons/fa'
import { FaCalendarDays, FaComments, FaPerson } from 'react-icons/fa6'
import { IoPerson } from 'react-icons/io5'

export default function page() {
    return (
        <div className='my-5'>
            <div className='w-full max-w-7xl mx-auto relative'>
                <ImgTag width={750} height={450} alt={"test single"} src={"https://building-blog.storage.iran.liara.space/1718433007077-Screenshot 2024-06-11 091827.png"} />
                <div className=''>
                    <h1>موضوع پست</h1>
                    <div className='flex text-gray-500 items-center justify-center gap-4'>
                        <span>
                            <FaPhotoVideo />
                        </span>
                        <span className='border-r border-dashed border-black h-6 w-1'></span>
                        <span className='flex gap-2 items-center'>
                            1403/06/15
                            <FaCalendarDays />
                        </span>
                        <span className='border-r border-dashed border-black h-6 w-1'></span>
                        <span className='flex gap-2 items-center'>
                            رضاخانی
                            <IoPerson />
                        </span>
                        <span className='border-r border-dashed border-black h-6 w-1'></span>
                        <span className='flex gap-2 items-center'>
                            0
                            <FaComments />
                        </span>

                    </div>
                </div>
            </div>
        </div>
    )
}
