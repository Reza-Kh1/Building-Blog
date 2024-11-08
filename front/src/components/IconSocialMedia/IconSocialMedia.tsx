import Link from 'next/link'
import React from 'react'
import { FaTelegramPlane } from 'react-icons/fa'
import { FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa6'

export default function IconSocialMedia() {
    return (
        <ul className="flex gap-5 text-gray-500 justify-center lg:justify-end dark:text-stone-100">
            <li className="relative">
                <Link
                    href="https://telegram.me/Reza_kh666"
                    className={`border-icon-footer hover:text-[#437dff] transition-all after:border-[#437dff] after:border`}
                >
                    <FaTelegramPlane  className='text-xl'/>
                </Link>
            </li>
            <li className="relative">
                <Link
                    href="http://instagram.com/_u/reza_kha.ni/"
                    className={`border-icon-footer hover:text-[#e23e7e] transition-all after:border-[#e23e7e] after:border`}
                >
                    <FaInstagram  className='text-xl'/>
                </Link>
            </li>
            <li className="relative">
                <Link
                    href="https://www.linkedin.com/in/reza-khani-242363284?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                    className={`border-icon-footer hover:text-[#98c7ff] transition-all after:border-[#98c7ff] after:border`}
                >
                    <FaLinkedin className='text-xl' />
                </Link>
            </li>
            <li className="relative">
                <Link
                    href="https://api.whatsapp.com/send?phone=09390199977"
                    className={`border-icon-footer hover:text-[#3ee280] transition-all after:border-[#3ee280] after:border`}
                >
                    <FaWhatsapp  className='text-xl'/>
                </Link>
            </li>
        </ul>
    )
}
