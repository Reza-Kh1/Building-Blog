"use client"
import React from 'react'
import subscribeAction from '@/action/suscribe'
import { FaTelegramPlane } from 'react-icons/fa'
import { useFormState } from 'react-dom'
import toast from 'react-hot-toast'
import { CiWarning } from 'react-icons/ci'

const initialState = {
    message: '',
    error: ''
}
export default function SubscribeForm() {
    const [state, formAction] = useFormState(subscribeAction, initialState)
    if (state.message) {
        toast.success("ok")
    }
    if (state.error) {
        toast.error("bad")
    }
    return (
        <>
            <form action={formAction} className="border relative bg-[#1a1b1c8c] rounded-md overflow-hidden border-slate-600">
                <i className="absolute right-0 top-1/2 flex items-center text-xl translate-x-0 border-l  h-full w-auto px-2  -translate-y-1/2">
                    <FaTelegramPlane color="white" />
                </i>
                <input required id='email' placeholder="ایمیل خود را وارد کنید" className="input-subscribe pr-11 py-2" type="text" />
                <button className="absolute left-0 top-1/2 translate-x-0 h-full w-auto px-5 -translate-y-1/2 bg-green-700 hover:bg-green-800 text-lime-50">عضویت</button>
            </form>
            {state.error ?
                <div className='p-2 text-sm mt-3 flex justify-between items-center rounded-md bg-slate-600 shadow-xl text-slate-300'>
                    <span>
                        {state.error}
                    </span>
                    <i><CiWarning /></i>
                </div>
                : null}

        </>
    )
}