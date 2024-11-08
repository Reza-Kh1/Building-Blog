import Link from 'next/link'
import React from 'react'
import { FaPhone } from 'react-icons/fa6'

export default function Calling() {
    return (
        <div>
            <Link href="tel:09390199977" className="fixed p-2 lg:p-3 bg-green-500 lg:text-xl shadow-md animate-pulse z-50 left-2 lg:left-4 bottom-2 lg:bottom-5 rounded-full text-white">
                <i><FaPhone /></i>
            </Link>
        </div>
    )
}
