"use client"
import React from 'react'
type InputFormType = {
    required?: boolean,
    placeholder?: string,
    name: string,
    className?: string,
    classPlus?: string,
    id?: string
    type: "text" | "email" | "password"
    lable?: string
    onChange?: (value: any) => void
}
export default function InputForm({ placeholder, required, className, name, id, type, onChange, classPlus, lable, }: InputFormType) {
    const classInput = 'p-3 focus-visible:outline-blue-300 bg-slate-100 rounded text-gray-900 w-full shadow-md ' + classPlus
    return (
        lable ?
            <div className='flex flex-col gap-2'>
                <label className='text-sm' htmlFor={id}>{lable}:{required ? "*" : null}</label>
                <input type={type} onChange={onChange} required={required} placeholder={placeholder} name={name} className={className ? className : classInput} id={id} />
            </div>
            :
            <input type={type} onChange={onChange} required={required} placeholder={placeholder} name={name} className={className ? className : classInput} id={id} />
    )
}
