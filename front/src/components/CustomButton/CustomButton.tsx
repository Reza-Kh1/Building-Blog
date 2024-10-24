"use client"
import { Button } from '@mui/material'
import React from 'react'
import { useFormStatus } from 'react-dom'
import { CgSpinner } from 'react-icons/cg'
type CustomButtonType = {
    iconEnd?: React.ReactNode
    iconStart?: React.ReactNode
    name: string,
    className?: string
    type: "submit" | "reset" | "button"
    color?: "warning" | "blue" | "primary"
    disable?: boolean
    onClick?: (value: any) => void
}
export default function CustomButton({ type, disable, iconEnd, iconStart, name, className, color, onClick }: CustomButtonType) {
    const { pending } = useFormStatus()
    let colorButton = "hover:from-blue-500/70 hover:to-blue-600/90 from-blue-400/70 to-blue-500"
    if (color === "blue") {
        colorButton = "hover:to-[#1a99e7] hover:from-[#a9e0ff] from-[#acdcf7] to-[#58b2e9]"
    }
    if (color === "warning") {
        colorButton = "from-[#ffaf66] to-[#e95858] hover:to-[#ff1010] hover:from-[#ff8b20]"
    }
    disable = disable || false
    return (
        <Button
            onClick={onClick}
            startIcon={iconStart}
            endIcon={pending ? <CgSpinner className='animate-spin' /> : iconEnd}
            disabled={disable}
            type={type} className={"!text-gray-100 bg-gradient-to-tl rounded-lg shadow-md " + colorButton + " " + className}>
            {name}
        </Button>
    )
}
