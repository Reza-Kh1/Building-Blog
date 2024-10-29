import React from 'react'
import ImgTag from '../ImgTag/ImgTag'
import Link from 'next/link'
import { FaPhone, FaRegUserCircle } from 'react-icons/fa'
import { ExpertsType } from '@/app/type'

export default function ExpertCard(props: ExpertsType) {
  return (
    <div className='bg-slate-900 shadow-md rounded-md pb-2'>
      <div className='w-full bg-slate-50 custom-rounded pt-2 flex justify-center pb-8 shadow-md'>
        <Link href={"experts/" + props.name.replace(/ /g, "-")} className='text-center'>
          <ImgTag alt={props.name} src={props?.image} width={300} height={300} className='rounded-full shadow-md w-40 h-40 object-cover' />
          <h4 className='font-semibold text-xl mt-2'>
            {props.name}
          </h4>
        </Link>
      </div>
      <div className='flex flex-wrap gap-3 w-full px-2 my-2'>
        <div className='flex items-center justify-between w-full'>
          <Link href={"tel:"} className='text-sm hover:bg-slate-800/90 p-1 rounded-md text-white flex items-center gap-1'>
            <i className='text-green-500'><FaPhone /></i>
            {props.phone}
          </Link>
          <div className='text-sm hover:bg-slate-800/90 p-1 rounded-md text-white'>
            <span>
              عضویت : {new Date(props.createdAt).toLocaleDateString("fa")}
            </span>
          </div>
        </div>
        <div className='w-full text-white flex gap-1'>
          <p>تخصص :</p>
          <span>
            {props.Tags.map((i, index) => {
              if ((index + 1) === props.Tags.length) return i.name
              return i.name + " ، "
            })}
          </span>
        </div>
        <Link href={"experts/" + props.name.replace(/ /g, "-")} className='text-white hover:bg-slate-700/90 flex items-center px-5 bg-slate-700/50 shadow-md p-1 rounded-md text-[17px] gap-1'>
          <span className='inline-block'>
            پروفایل
          </span>
          <i>
            <FaRegUserCircle />
          </i>
        </Link>
      </div>
    </div>
  )
}
