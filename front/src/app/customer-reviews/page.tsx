import Breadcrums from '@/components/Breadcrums/Breadcrums'
import Comments from '@/components/Comments/Comments'
import ContactSocialMedia from '@/components/ContactSocialMedia/ContactSocialMedia'
import FormComments from '@/components/FormComments/FormComments'
import React from 'react'

export default function page() {
  return (
    <div className='w-full mx-auto max-w-7xl my-8'>
      <Breadcrums />
      <h1 className='mt-6 text-xl mb-6'>
        نظرات مشتریان نسبت به ما
      </h1>
      <Comments />
      <div className='w-2/3 mt-8'>
        <FormComments />
      </div>
      <div className='flex mt-20 gap-5'>
        <ContactSocialMedia />
      </div>
    </div>
  )
}
