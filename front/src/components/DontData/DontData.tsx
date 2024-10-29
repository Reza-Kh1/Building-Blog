import { IconButton, Tooltip } from '@mui/material'
import React from 'react'
import { BsFillInfoCircleFill } from 'react-icons/bs'
type DontDataType = {
    icon?: React.ReactNode
    name: string
    className?: string
}
export default function DontData({ name, icon, className }: DontDataType) {
    return (
        <div className='bg-gradient-to-br to-slate-600 from-blue-300 w-full flex p-3 my-6 items-center text-white rounded-md shadow-md'>
            <span>{name}</span>
            <Tooltip placement='top' title="هیچ اطلاعاتی در دیتابیس پیدا نشد!">
                <IconButton color='inherit' >
                    <BsFillInfoCircleFill />
                </IconButton>
            </Tooltip>
        </div>
    )
}
