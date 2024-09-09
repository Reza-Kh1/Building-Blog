"use client"
import React from 'react'
type InputFormType = {
    required?: boolean,
    placeholder: string,
    name: string,
    className?: string,
    id?: string
    type: "text" | "email" | "password"
    onChange?: (value: any) => void
}
export default function InputForm({ placeholder, required, className, name, id, type, onChange }: InputFormType) {
    const classInput = 'p-3 focus-visible:outline-blue-300 bg-slate-100 rounded text-gray-900 w-full shadow-md'
    return (
        <input type={type} onChange={onChange} required={required} placeholder={placeholder} name={name} className={className ? className : classInput} id={id} />
    )
}
