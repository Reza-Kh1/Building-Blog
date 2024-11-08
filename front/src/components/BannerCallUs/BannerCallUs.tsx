import Link from 'next/link'
import React from 'react'

export default function BannerCallUs() {
    return (
        <div className="w-full my-6 lg:my-10 py-4 bg-blue-400 shadow-md shadow-[#1b6cffa6] flex items-center gap-2 justify-center relative">
            <span className="text-white text-xs md:text-base">
                آیا میخواهید خانه رویایی خود را با ما بسازید ؟
            </span>
            <Link href={"/contact-us"} className="text-white font-semibold text-sm md:text-base">اینجا کلیک کنید</Link>
            <span className="w-full absolute h-1 bg-[#4b8fffb3] left-0 bottom-0"></span>
        </div>
    )
}
