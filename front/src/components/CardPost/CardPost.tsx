import { CardPostType } from '@/app/type'
import Link from 'next/link'
import React from 'react'
import { FaArrowLeft, FaCalendarDay, FaComments, FaPhotoVideo } from 'react-icons/fa'

export default function CardPost({ props }: { props?: CardPostType[] }) {
    if (!props?.length) return
    return props.map((i, index) => (
        <Link href={`/post/${i.title}`} key={index}>
            <div className="shadow-md group hover:shadow-slate-600 transition-all w-full relative rounded-lg bg-cover bg-center min-h-80 bg-no-repeat" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, .8), rgba(0, 0, 0, .4)), url('https://building-blog.storage.iran.liara.space/1718433007077-Screenshot 2024-06-11 091827.png')` }}>
                <div className="z-10 absolute flex flex-col justify-evenly h-full p-3">
                    <span className="text-xs text-gray-300">{i?.Category?.name}</span>
                    <h4 className="text-xl font-semibold text-gray-50">{i.title}</h4>
                    <div className="flex text-gray-400 text-sm items-center gap-3 justify-start">
                        <div>
                            <i>
                                <FaPhotoVideo />
                            </i>
                        </div>
                        |
                        <div className="flex gap-2 items-center">
                            <i>
                                <FaComments />
                            </i>
                            <span>{i.totalComments}</span>
                        </div>
                        |
                        <div className="flex gap-2 items-center">
                            <i>
                                <FaCalendarDay />
                            </i>
                            <span>{new Date(i.updatedAt).toLocaleDateString("fa")}</span>
                        </div>
                    </div>
                    <p className="text-justify text-gray-300 cutline cutline-3">{i.description}</p>
                    <div className="h-8">
                        <span className="opacity-0 absolute transition-all bottom-4 group-hover:bottom-7 flex pt-3 group-hover:pt-0 group-hover:opacity-100">
                            <i className="p-3 bg-white hover:shadow-black transition-all text-gray-900 rounded-full shadow-md shadow-slate-400">
                                <FaArrowLeft />
                            </i>
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    ))
}
