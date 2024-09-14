import React from 'react'
type CustomButtonType = {
    iconEnd?: React.ReactNode
    iconStart?: React.ReactNode
    name: string,
    className?: string
    iconClass?: string
    type: "submit" | "reset" | "button"
}
export default function CustomButton({ type, iconEnd, iconStart, name, className, iconClass }: CustomButtonType) {
    return (
        <button type={type} className={"flex p-3 text-gray-100 px-5 justify-center gap-1 text-sm items-center bg-gradient-to-b from-blue-400/70 to-blue-500 rounded-full hover:from-blue-500/70 shadow-md hover:to-blue-600/90 " + className}>
            {iconStart ? <i className={iconClass}>
                {iconStart}
            </i> : null}
            {name}
            {iconEnd ? <i className={iconClass}>
                {iconEnd}
            </i> : null}

        </button>
    )
}
