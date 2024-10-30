import Link from 'next/link'
import React from 'react'

export default function BannerCallUs() {
    return (
        <div className="w-full my-10 py-5 bg-blue-400 shadow-md flex items-center gap-2 justify-center relative">
            <span className="text-white">
                آیا میخواهید خانه رویایی خود را با ما بسازید ؟
            </span>
            <Link href={"/contact-us"} className="text-white font-semibold">اینجا کلیک کنید</Link>
            <span className="w-full absolute h-1 bg-blue-500/70 left-0 bottom-0"></span>
        </div>
    )
}
