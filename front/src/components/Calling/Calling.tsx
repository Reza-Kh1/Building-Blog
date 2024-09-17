import Link from 'next/link'
import React from 'react'
import { FaPhone } from 'react-icons/fa'

export default function Calling() {
    return (
        <div>
            <Link href="tel:09390199977" className="fixed p-3 bg-green-500 text-xl shadow-md animate-pulse z-50 left-5 bottom-5 rounded-full text-white">
                <i><FaPhone /></i>
            </Link>
        </div>
    )
}
