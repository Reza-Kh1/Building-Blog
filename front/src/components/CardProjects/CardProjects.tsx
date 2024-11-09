import Link from 'next/link'
import React from 'react'
import ImgTag from '../ImgTag/ImgTag'
import { FaPlay, FaRegCalendarCheck } from 'react-icons/fa'
import { CardProjectsType } from '@/app/type'
import CustomButton from '../CustomButton/CustomButton'
import { BsArrowUpLeftSquare } from 'react-icons/bs'
import { GrUserWorker } from "react-icons/gr";
import { SiGooglemaps } from "react-icons/si";
import { MdAddHomeWork } from 'react-icons/md'
export default function CardProjects({ project }: { project: CardProjectsType }) {    
    return (
        <div className='hover:shadow-md rounded-md group   '>
            <Link href={"/project/" + project.name.replace(/ /g, "-")} className="relative group/image">
                <ImgTag
                    figureClass="relative w-full overflow-hidden rounded-md"
                    alt={"نمونه پروژه"}
                    src={project?.image}
                    width={400}
                    height={300}
                    classPlus="group-hover/image:scale-125 w-52 h-40 md:w-80 md:h-52 xl:w-96 xl:h-64 hover-project"
                />
                <i className="absolute text-[8px] md:text-xs md:left-2  left-1 md:top-2 top-1 p-1 rounded-md bg-slate-700/80 flex gap-1 items-center text-white ">
                    <FaRegCalendarCheck />
                    {new Date(project?.updatedAt).toLocaleDateString("fa")}
                </i>
                <i className="p-3 md:p-5 text-white group-hover:opacity-100  opacity-0 rounded-full backdrop-blur-md absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <FaPlay className=' md:text-xl' />
                </i>
            </Link>
            <div className="flex flex-col p-2">
                <div className='flex'>
                    <Link href={"/project/" +project.name.replace(/ /g, "-")} className='flex text-gray-800 group/name items-center gap-1'>
                        <i className='group-hover/name:text-blue-400'><MdAddHomeWork /></i>
                        <h3 className="group-hover/name:text-blue-400 md:text-xl">{project.name}</h3>
                    </Link>
                </div>
                <div className='flex my-2 md:mt-3 mb-1'>
                    <Link href={"/experts/" + project.Worker?.name.replace(/ /g, "-")} className='group/expert text-gray-600 flex items-center gap-1'>
                        <i className='group-hover/expert:text-blue-400'><GrUserWorker /></i>
                        <span className='md:text-sm group-hover/expert:text-blue-400 text-xs'>{project.Worker?.name}</span>
                    </Link>
                </div>
                <div className='flex items-center gap-1 mb-1 text-gray-600'>
                    <i><SiGooglemaps /></i>
                    <span className="text-xs md:text-sm">
                        {project.address}
                    </span>
                </div>
                {/* <Link href={"/project/" + project.name.replace(/ /g, "-")} className='w-full mx-auto md:w-1/3 block opacity-0 group-hover:opacity-100'>
                    <CustomButton name='نمایش پروژه' type='button' className='!text-sm' iconEnd={<BsArrowUpLeftSquare size={18} />} />
                </Link> */}
            </div>
        </div>
    )
}