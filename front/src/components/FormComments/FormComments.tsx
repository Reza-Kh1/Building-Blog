"use client"
import React from 'react'
import InputForm from '../InputForm/InputForm'
import { fetchApi } from '@/action/fetchApi'
import toast from 'react-hot-toast'
export default function FormComments({ postId }: { postId?: number }) {

  const commentsHandler = async (form: FormData) => {
    
    const body = {
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone"),
      text: form.get("text"),
      postId
    }
    console.log(postId);
    
    fetchApi({ url: "comment", method: "POST", body }).then(() => {
      toast.success("نظر شما پس از تایید نمایش داده می شود")
    }).catch((err) => {
      console.log(err);
      toast.error("ایمیل و شماره تلفن را صحیح وارد کنید")
    })
  }
  return (
    <div className='form-comments' id="form-comments">
      <h5 className='text-xl mb-3'><span className='text-[#58b2e9]'>کامنت</span> خود را ثبت کنید.</h5>
      <form action={commentsHandler} className='flex flex-col gap-3'>
        <div className='flex justify-between items-center gap-3'>
          <div>
            <span className='text-sm mb-1 inline-block'>نام :*</span>
            <InputForm type='text' name='name' placeholder='نام' required />
          </div>
          <div>
            <span className='text-sm mb-1 inline-block'>شماره تلفن :*</span>
            <InputForm type='text' name='phone' placeholder='شماره تلفن' onChange={(e) => {
              e.target.value = e.target.value.replace(
                /[^0-9]/g,
                ""
              );
            }} required />
          </div>
          <div>
            <span className='text-sm mb-1 inline-block'>ایمیل :</span>
            <InputForm type='email' name='email' placeholder='ایمیل' />
          </div>
        </div>
        <div>
          <span className='text-sm mb-1 inline-block'>کامنت خود را ثبت کنید :*</span>
          <textarea name="text" rows={6} wrap='6' required className='bg-slate-100 w-full shadow-md focus-visible:outline-blue-300 resize-none p-2 rounded-md' id="" placeholder='نظر خودتان را بنویسید' />
        </div>
        <div>
          <button type='submit' className='bg-gradient-to-r from-[#afcad9] to-[#58b2e9] w-3/12 py-3 rounded-md shadow-md text-white hover:to-[#58b2e9]/80 hover:from-[#afcad9]/80 transition-all'>
            ارسال
          </button>
        </div>
      </form>
    </div>
  )
}
