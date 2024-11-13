import React from 'react'
import ImgTag from '../ImgTag/ImgTag'
import Link from 'next/link'
import { FaPhone, FaRegUserCircle } from 'react-icons/fa'
import { ExpertType } from '@/app/type'
import { IoIosCheckmarkCircleOutline } from 'react-icons/io'
import { FaCalendar } from 'react-icons/fa6'

export default function CardExperts(props: ExpertType) {
  return (
    <section className='w-full shadow-md dark:shadow-full-dark dark:hover:shadow-none transition-all bg-gradient-to-b to-blue-300 dark:to-slate-700 dark:from-zinc-900 from-slate-200 rounded-md'>
      <div className='h-32 dark:bg-info-dark bg-gray-50 shadow-md rounded-t-md'>
        <h3 className='font-semibold text-sm md:text-base p-2 flex justify-between items-center dark:text-p-dark'>
          {props.name}
          <span className='text-xs md:text-sm font-normal flex items-center gap-1 dark:text-s-dark'>
            مورد تایید<IoIosCheckmarkCircleOutline className='text-green-500 text-xl' />
          </span>
        </h3>
        <Link href={"experts/" + props?.name?.replace(/ /g, "-")} className='w-full flex justify-center'>
          <ImgTag figureClass='relative' alt={props.name} src={props?.image} width={300} height={300} className='rounded-full border-8 dark:border-[#262e3b] border-[#b1d2f8] w-40 h-40 object-cover' />
        </Link>
      </div>
      <div className='mt-14 p-2 text-white'>
        <div className='flex flex-wrap gap-2 w-full md:px-2 my-2'>
          <div className='flex flex-col md:flex-row items-start md:items-center justify-between w-full'>
            <Link href={"tel:" + props.phone} className='w-full text-sm hover:bg-blue-400/70 hover:shadow-md p-1 px-2 rounded-md dark:text-p-dark text-white flex items-center gap-2'>
              <i className='text-gray-50 dark:text-p-dark'><FaPhone /></i>
              {props.phone}
            </Link>
            <div className='text-sm w-full md:justify-end hover:bg-blue-400/70 hover:shadow-md p-1 px-2 rounded-md dark:text-p-dark text-white flex items-center gap-2'>
              <FaCalendar className='text-gray-50 dark:text-p-dark' />
              <span>
                {new Date(props.createdAt).toLocaleDateString("fa")}
              </span>
            </div>
          </div>
          {props?.Tags?.length ?
            (
              <div className='w-full text-white flex gap-1 dark:text-p-dark'>
                <p>تخصص :</p>
                <span>
                  {props.Tags.map((i, index) => {
                    if ((index + 1) === props.Tags?.length) return i.name
                    return i.name + " ، "
                  })}
                </span>
              </div>
            )
            : null}
          <Link href={"experts/" + props?.name?.replace(/ /g, "-")} className='text-sm md:text-base mt-3 text-gray-600 mx-auto hover:text-blue-400 dark:bg-info-dark dark:text-h-dark dark:shadow-low-dark dark:hover:shadow-none hover:shadow-blue-300 flex items-center px-5 bg-gray-50  shadow-md p-1 rounded-md text-[17px] gap-1'>
            <span className='inline-block'>
              پروفایل
            </span>
            <i>
              <FaRegUserCircle />
            </i>
          </Link>
        </div>
      </div>
    </section>
  )
}
