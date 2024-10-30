import Link from 'next/link'
import React from 'react'
import ImgTag from '../ImgTag/ImgTag'
import { FaPlay, FaRegCalendarCheck } from 'react-icons/fa'
import { CardProjectsType } from '@/app/type'
import CustomButton from '../CustomButton/CustomButton'
import { BsArrowUpLeftSquare } from 'react-icons/bs'
import DontData from '../DontData/DontData'
import { GrUserWorker } from "react-icons/gr";
import { SiGooglemaps } from "react-icons/si";
import { MdAddHomeWork } from 'react-icons/md'
export default function CardProjects({ data }: { data: CardProjectsType[] }) {
    return (
        data?.length ?
            data.map((i, index) => (
                <div key={index} className='hover:shadow-md rounded-md group   '>
                    <Link href={i.name.replace(/ /g, "-")} className="relative group/image">
                        <ImgTag
                            figureClass="relative w-full overflow-hidden rounded-md"
                            alt={"نمونه پروژه"}
                            src={i?.image}
                            width={500}
                            height={350}
                            classPlus="group-hover/image:scale-125 hover-project"
                        />
                        <i className="absolute text-xs  left-2 top-2 p-1 rounded-md bg-slate-700/70 flex gap-1 items-center text-white ">
                            <FaRegCalendarCheck />
                            {new Date(i?.createdAt).toLocaleDateString("fa")}
                        </i>
                        <i className="p-5 text-white group-hover:opacity-100  opacity-0 rounded-full backdrop-blur-md absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <FaPlay className='text-xl' />
                        </i>
                    </Link>
                    <div className="flex flex-col gap-2 p-2">
                        <div className='flex'>

                            <Link href={i.name.replace(/ /g, "-")} className='flex group items-center gap-1'>
                                <i className='group-hover:text-blue-400'><MdAddHomeWork /></i>
                                <span className="group-hover:text-blue-400 text-xl">{i.name}</span>
                            </Link>
                        </div>
                        <div className='flex'>
                            <Link href={i.Worker?.name.replace(/ /g, "-")} className='group flex items-center gap-1'>
                                <i className='group-hover:text-blue-400'><GrUserWorker /></i>
                                <span className='text-sm text-gray-700 group-hover:text-blue-400'>{i.Worker?.name}</span>
                            </Link>
                        </div>
                        <div className='flex items-center gap-1'>
                            <i><SiGooglemaps /></i>
                            <span className="text-sm text-gray-700">
                                {i.address}
                            </span>
                        </div>
                        <Link href={i.name.replace(/ /g, "-")} className='w-1/2 block opacity-0 group-hover:opacity-100'>
                            <CustomButton name='نمایش پروژه' type='button' iconEnd={<BsArrowUpLeftSquare />} />
                        </Link>
                    </div>
                </div>
            ))
            :
            <DontData name='هیچ اطلاعاتی یافت نشد!' />
    )
}