import React from 'react'
import { FaStar } from 'react-icons/fa6'
import FormRequest from './FormRequest'
import { PiWarningDiamondFill } from 'react-icons/pi'
import IconSocialMedia from '@/components/IconSocialMedia/IconSocialMedia'
import ContactSocialMedia from '@/components/ContactSocialMedia/ContactSocialMedia'
export default function page() {
    return (
        <div className='max-w-7xl mx-auto w-full my-10'>
            <h1 className='text-xl font-semibold mb-5'>گرفتن قیمت کار ساختمانی آنلاین</h1>
            <div className='flex items-center gap-2'>
                <i className='text-yellow-300 text-xl'><FaStar /></i>
                <span> در این صفحه میتوانید  با بارگزاری عکس از محیط کار یا پروژه خود و پر کردن فرم های خواسته شده میتوانید از ما به صورت آنلاین قیمت بگیرید در کمتر از 6 ساعت به درخواست شما پاسخ خواهیم داد.</span>
            </div>
            <div className='mt-16 block'>
                <div className='text-center mb-3'>
                    <div className='font-semibold flex gap-5 mb-5 items-center justify-center'>
                        <i className='text-orange-500 text-xl'><PiWarningDiamondFill /></i>
                        <span className='text-red-500'>
                            اگر عکس یا فیلم شما حجم بیش از 10 مگابایت دارد لطفا در شبکه های اجتماعی برای ما ارسال کنید
                        </span>
                        <i className='text-orange-500 text-xl'><PiWarningDiamondFill /></i>
                    </div>
                    <span className='text-xl'>فیلد های ستاره دار الزامی هستند.</span>
                </div>
                <FormRequest />
                <p>
                    شبکه های اجتماعی ما برای گرفتن قیمت پروژه متناسب با فرم ها اطلاعات برای ما ارسال کنید
                </p>
                <div className='my-12 flex gap-3'>
                    <ContactSocialMedia />
                </div>
            </div>
        </div>
    )
}
