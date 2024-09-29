import Breadcrums from '@/components/Breadcrums/Breadcrums'
import ImgTag from '@/components/ImgTag/ImgTag'
import React from 'react'
import FormContactUs from './FormContactUs'
import ContactSocialMedia from '@/components/ContactSocialMedia/ContactSocialMedia'
export default function page() {
  return (
    <div className='mx-auto max-w-7xl w-full my-5'>
      <Breadcrums />

      <div className='mt-4'>
        <h1 className='text-2xl mb-2 block font-medium'>
          ارتباط  با ما
        </h1>
        <p>
          با ما در ارتباط باشید تا پروژه‌های ساختمانی خود را با راهکارهای حرفه‌ای و نوآورانه به واقعیت تبدیل کنید. تیم ما آماده پاسخگویی به سوالات و ارائه مشاوره‌های تخصصی است.
        </p>
      </div>
      <div className='w-full flex gap-3 my-12 justify-around'>
        <div className='w-1/2'>
          <h3 className='text-xl mb-5'>
            پیام خود را برای ما ارسال کنید.
          </h3>
          <FormContactUs />
        </div>
        <figure className='w-1/2'>
          <ImgTag src={"/contact-us.jpg"} alt={"contact-us"} height={400} width={400} />
        </figure>
      </div>
      <div className='my-12 flex gap-3'>
        <ContactSocialMedia />
      </div>
    </div>
  )
}
