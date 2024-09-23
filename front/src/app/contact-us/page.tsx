import Breadcrums from '@/components/Breadcrums/Breadcrums'
import ImgTag from '@/components/ImgTag/ImgTag'
import Link from 'next/link'
import React from 'react'
import { FaInstagram, FaPhone, FaTelegram } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'
type BoxType = {
  url: string
  icon: React.ReactNode
  title: string
  span: string
}
export default function page() {
  const BoxComponent = ({ url, icon, title, span }: BoxType) => {
    return (
      < div className='border rounded-md w-1/4 text-center p-3 flex flex-col gap-3 relative pt-12' >
        <Link href={url} className='absolute bg-white p-3 left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2'>
          {icon}
        </Link>
        <span className='text-xl'>
          {title}
        </span>
        <span className='text-gray-500'>
          {span}
        </span>
      </div >
    )
  }
  return (
    <div className='mx-auto max-w-7xl w-full my-5'>
      <Breadcrums />

      <div className='mt-4'>
        <h1 className='text-xl font-medium'>
          ارتباط  با ما
        </h1>
        <p>
          با ما در ارتباط باشید تا پروژه‌های ساختمانی خود را با راهکارهای حرفه‌ای و نوآورانه به واقعیت تبدیل کنید. تیم ما آماده پاسخگویی به سوالات و ارائه مشاوره‌های تخصصی است.
        </p>
      </div>
      <div className='w-full flex gap-3'>
        <div></div>
        <figure>
          <ImgTag src={"/contact-us.jpg"} alt={"contact-us"} height={300} width={300} />
        </figure>
      </div>
      <div className='my-12 flex gap-3'>
        <BoxComponent title='تلگرام' icon={<FaTelegram className='text-blue-400 text-5xl' />} span='Reza_kh666@' url='https://telegram.me/Reza_kh666' />
        <BoxComponent title='تماس با ما' icon={<FaPhone className='text-blue-400 text-5xl' />} span='09390199977' url='https://telegram.me/Reza_kh666' />
        <BoxComponent title='اینستاگرام' icon={<FaInstagram className='text-blue-400 text-5xl' />} span='Reza_kha.ni' url='instagram.com/_u/Reza_kha.ni' />
        <BoxComponent title='ایمیل' icon={<MdEmail className='text-blue-400 text-5xl' />} span='R.khani1385.66@gmail.com' url='mailto:r.khani1385.66@gmail.com' />
      </div>
    </div>
  )
}
