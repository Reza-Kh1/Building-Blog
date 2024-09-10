import React from 'react'
import ImgTag from '../ImgTag/ImgTag'
import { IoArrowRedoSharp } from 'react-icons/io5'
export default function Comments() {
    return (
        <div className='comments mb-3' id='comments'>
            <h5 className=' text-lg mb-3'><span className='text-[#58b2e9]'>کامنت</span> کاربران</h5>
            <div className='mr-8 relative'>
                <div>
                    <div className='w-16 absolute right-0 transform translate-x-1/2 top-4 p-1 bg-white border rounded-full'>
                        <ImgTag width={80} height={50} className='rounded-full shadow-md' src={"/image-admin.png"} alt={"person"} />
                    </div>
                    <div className='border my-2 rounded-sm shadow-sm pr-10 pl-3 py-5'>
                        <div className='flex w-full justify-between mb-3'>
                            <div className='flex flex-col'>
                                <span className='font-bold text-gray-700'>Reza</span>
                                <span className='text-xs text-gray-400 italic'>1403/12/23</span>
                            </div>
                            <i className='cursor-pointer hover:text-gray-950 text-gray-500'>
                                <IoArrowRedoSharp />
                            </i>
                        </div>
                        <div className='text-justify text-sm text-gray-700 pl-5'>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam dignissimos labore laborum quod consequatur! Nisi reprehenderit modi corrupti? Pariatur repudiandae facere magni alias delectus accusantium similique nobis, suscipit soluta voluptatum.</p>
                        </div>
                    </div>
                </div>
                <div className='mr-8 relative'>
                    <div>
                        <div className='w-12 absolute right-0 transform translate-x-1/2 top-4 p-1 bg-white border rounded-full'>
                            <ImgTag width={80} height={50} className='rounded-full shadow-md' src={"/semicolon-image.png"} alt={"person"} />
                        </div>
                        <div className='border my-2 rounded-sm shadow-sm pr-10 pl-3 py-5'>
                            <div className='flex w-full justify-between mb-3'>
                                <div className='flex flex-col'>
                                    <span className='font-bold text-gray-700'>Reza</span>
                                    <span className='text-xs text-gray-400 italic'>1403/12/23</span>
                                </div>
                                <i className='cursor-pointer hover:text-gray-950 text-gray-500'>
                                    <IoArrowRedoSharp />
                                </i>
                            </div>
                            <div className='text-justify text-sm text-gray-700 pl-5'>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam dignissimos labore laborum quod consequatur! Nisi reprehenderit modi corrupti? Pariatur repudiandae facere magni alias delectus accusantium similique nobis, suscipit soluta voluptatum.</p>
                            </div>
                        </div>
                    </div>
                    <div className='mr-8 relative'>
                        <div>
                            <div className='w-12 absolute right-0 transform translate-x-1/2 top-4 p-1 bg-white border rounded-full'>
                                <ImgTag width={80} height={50} className='rounded-full shadow-md' src={"/semicolon-image.png"} alt={"person"} />
                            </div>
                            <div className='border my-2 rounded-sm shadow-sm pr-10 pl-3 py-5'>
                                <div className='flex w-full justify-between mb-3'>
                                    <div className='flex flex-col'>
                                        <span className='font-bold text-gray-700'>Reza</span>
                                        <span className='text-xs text-gray-400 italic'>1403/12/23</span>
                                    </div>
                                    <i className='cursor-pointer hover:text-gray-950 text-gray-500'>
                                        <IoArrowRedoSharp />
                                    </i>
                                </div>
                                <div className='text-justify text-sm text-gray-700 pl-5'>
                                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam dignissimos labore laborum quod consequatur! Nisi reprehenderit modi corrupti? Pariatur repudiandae facere magni alias delectus accusantium similique nobis, suscipit soluta voluptatum.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mr-8 relative'>
                        <div>
                            <div className='w-12 absolute right-0 transform translate-x-1/2 top-4 p-1 bg-white border rounded-full'>
                                <ImgTag width={80} height={50} className='rounded-full shadow-md' src={"/semicolon-image.png"} alt={"person"} />
                            </div>
                            <div className='border my-2 rounded-sm shadow-sm pr-10 pl-3 py-5'>
                                <div className='flex w-full justify-between mb-3'>
                                    <div className='flex flex-col'>
                                        <span className='font-bold text-gray-700'>Reza</span>
                                        <span className='text-xs text-gray-400 italic'>1403/12/23</span>
                                    </div>
                                    <i className='cursor-pointer hover:text-gray-950 text-gray-500'>
                                        <IoArrowRedoSharp />
                                    </i>
                                </div>
                                <div className='text-justify text-sm text-gray-700 pl-5'>
                                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam dignissimos labore laborum quod consequatur! Nisi reprehenderit modi corrupti? Pariatur repudiandae facere magni alias delectus accusantium similique nobis, suscipit soluta voluptatum.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
